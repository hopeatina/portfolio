/**
 * Things Hope has actually said, in her own words, with where and when.
 *
 * Sources: the Figma Config 2021 talk, interview transcripts, and dated
 * messages Hope wrote in her own ChatGPT, Claude, and Codex sessions,
 * attribution-audited in October 2026 (lines that turned out to be
 * assistant-written or pasted copy were excluded). Light trimming is
 * marked with an ellipsis. Nothing here was written for the site.
 */
export interface Quote {
  text: string;
  /** Where it was said: a talk, an interview, a working session. */
  source: string;
  date: string;
  /** Lines used once in a fixed place on the home page. */
  featured?: "hero" | "lead";
}

export const quotes: Quote[] = [
  { text: "Share the why, diversify the how.", source: "In conversation", date: "September 2025", featured: "hero" },
  { text: "Compute as proportional to consideration, taste as the X factor.", source: "On creativity, in conversation", date: "April 2025", featured: "lead" },
  { text: "I’m less about talk and more about action.", source: "Figma Config, on starting Figma and Chill", date: "2021" },
  { text: "It’s not a lack of words. It’s a lack of retrievals.", source: "Bessemer interview", date: "October 2026" },
  { text: "Consistency builds up into an avalanche of momentum.", source: "In conversation", date: "April 2025" },
  { text: "I’ll just keep building. That’s how I compound.", source: "On being a generalist", date: "September 2025" },
  { text: "Style is the moat.", source: "A product design discussion", date: "September 2025" },
  { text: "Collaboration by default, not by crisis.", source: "On independence and interdependence", date: "December 2025" },
  { text: "I believe that we should have a maximalist future.", source: "A portfolio reflection", date: "December 2024" },
  { text: "It’s becoming the protagonist rather than a victim. That’s the fundamental change.", source: "On agency", date: "May 2025" },
  { text: "I want to make a racing game that will show the diversity and craziness of driving in Cameroon.", source: "The first note on Chaos Riders", date: "August 2025" },
  { text: "The diagnosis is right. The prescription is generic. The math is fake-rigorous.", source: "Reviewing an AI business analysis", date: "April 2026" },
  { text: "Make it 100x better… where is the flair, the taste, the attention to detail?", source: "Reviewing the OrgX carousel engine", date: "July 2026" },
  { text: "We could do better on visual repetition that doesn’t have accompanied significance.", source: "Reviewing the OrgX carousel engine", date: "July 2026" },
  { text: "Trains of thought, and thinking rockets.", source: "On extending cognition", date: "January 2026" },
  { text: "There is no drought. There’s only a flood and there will only be rain…", source: "A voice note", date: "May 2025" },
  { text: "I believe solutions should be accessible. Discovery should be democratized.", source: "In a working session", date: "October 2026" },
];

export const heroLine = quotes.find((quote) => quote.featured === "hero")!;
export const leadQuote = quotes.find((quote) => quote.featured === "lead")!;
export const collectedQuotes = quotes.filter((quote) => !quote.featured);
