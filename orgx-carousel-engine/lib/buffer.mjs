// Minimal Buffer GraphQL client for CI (no MCP available in GitHub Actions).
// Auth: BUFFER_ACCESS_TOKEN (generate at https://publish.buffer.com/settings/api).
// Verified against Buffer's GraphQL schema via introspection (createIdea / posts / aggregatedPostMetrics).
const ENDPOINT = process.env.BUFFER_GRAPHQL_ENDPOINT || 'https://graph.buffer.com';

function token() {
  const t = process.env.BUFFER_ACCESS_TOKEN;
  if (!t) throw new Error('BUFFER_ACCESS_TOKEN not set — cannot talk to Buffer. Queue was written to state only.');
  return t;
}
export function hasToken() {
  return !!process.env.BUFFER_ACCESS_TOKEN;
}

async function gql(query, variables) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
    body: JSON.stringify({ query, variables }),
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { throw new Error(`Buffer HTTP ${res.status}: ${text.slice(0, 400)}`); }
  if (json.errors) throw new Error('Buffer GraphQL error: ' + JSON.stringify(json.errors).slice(0, 600));
  return json.data;
}

const CREATE_IDEA = `
mutation CreateIdea($input: CreateIdeaInput!) {
  createIdea(input: $input) {
    __typename
    ... on Idea { id createdAt }
    ... on IdeaResponse { idea { id } }
    ... on InvalidInputError { message }
    ... on UnauthorizedError { message }
    ... on UnexpectedError { message }
    ... on LimitReachedError { message }
  }
}`;

// Create a draft Idea (review-queue). media = [{url, alt}]. Returns { ideaId } or throws.
export async function createIdea({ organizationId, title, text, media = [], services = ['tiktok'], cta }) {
  const input = {
    organizationId,
    content: {
      title,
      text,
      aiAssisted: true,
      services,
      media: media.map((m) => ({ url: m.url, alt: m.alt || '', type: 'image', thumbnailUrl: m.thumbnailUrl || m.url })),
    },
  };
  if (cta) input.cta = cta;
  const data = await gql(CREATE_IDEA, { input });
  const p = data.createIdea;
  const type = p.__typename;
  if (type === 'Idea') return { ideaId: p.id, typename: type };
  if (type === 'IdeaResponse') return { ideaId: p.idea && p.idea.id, typename: type };
  throw new Error(`createIdea failed (${type}): ${p.message || 'unknown'}`);
}

export async function listChannels(organizationId) {
  const q = `query($input: ChannelsInput!){ channels(input:$input){ id name service type isDisconnected } }`;
  const data = await gql(q, { input: { organizationId } });
  return data.channels || [];
}

// Best-effort: pull recent posts with metrics for the learner. Adapts to the metric field shape.
export async function fetchRecentPosts({ organizationId, first = 40 }) {
  // metrics is a list of { key/name, value } — try both shapes.
  const shapes = ['key value', 'name value displayName'];
  let lastErr;
  for (const metricSel of shapes) {
    const q = `query($input: PostsInput!, $first: Int){
      posts(input:$input, first:$first){
        edges{ node{
          id status channelService dueAt sentAt text
          metricsUpdatedAt
          metrics{ ${metricSel} }
          tags
        } }
      }
    }`;
    try {
      const data = await gql(q, {
        input: { organizationId, filter: { status: ['sent'] }, sort: [{ field: 'dueAt', direction: 'desc' }] },
        first,
      });
      return (data.posts?.edges || []).map((e) => e.node);
    } catch (e) { lastErr = e; }
  }
  // Retry without filter/sort in case those inputs differ.
  const q2 = `query($input: PostsInput!, $first: Int){
    posts(input:$input, first:$first){ edges{ node{ id status channelService dueAt sentAt text metrics{ key value } } } } }`;
  try {
    const data = await gql(q2, { input: { organizationId }, first });
    return (data.posts?.edges || []).map((e) => e.node);
  } catch (e) { throw lastErr || e; }
}

// Normalize a Buffer metrics list into { impressions, reactions, comments, saves, shares, engagementRate }.
export function normalizeMetrics(metricsList = []) {
  const m = {};
  for (const item of metricsList) {
    const k = String(item.key || item.name || '').toLowerCase();
    const v = Number(item.value) || 0;
    if (k.includes('impression') || k.includes('reach')) m.impressions = Math.max(m.impressions || 0, v);
    else if (k.includes('like') || k.includes('reaction') || k.includes('favorite')) m.reactions = v;
    else if (k.includes('comment') || k.includes('replies')) m.comments = v;
    else if (k.includes('save') || k.includes('bookmark')) m.saves = v;
    else if (k.includes('share') || k.includes('retweet') || k.includes('repost')) m.shares = v;
    else if (k.includes('engagement')) m.engagement = v;
  }
  const denom = m.impressions || 0;
  const interactions = (m.reactions || 0) + (m.comments || 0) + (m.saves || 0) + (m.shares || 0);
  m.engagementRate = denom > 0 ? interactions / denom : (m.engagement || 0);
  m.interactions = interactions;
  return m;
}
