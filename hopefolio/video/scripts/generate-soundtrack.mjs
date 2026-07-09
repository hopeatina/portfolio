import fs from "node:fs";
import path from "node:path";

const SAMPLE_RATE = 48_000;
const DURATION_SECONDS = 28;
const CHANNELS = 2;
const TAU = Math.PI * 2;
const frameCount = SAMPLE_RATE * DURATION_SECONDS;

const root = path.resolve(import.meta.dirname, "../..");
const outputDirectory = path.join(root, "public/video/portfolio-film");
const metadataDirectory = path.join(root, "video/preproduction");
const outputPath = path.join(outputDirectory, "continuity-score.wav");

fs.mkdirSync(outputDirectory, { recursive: true });
fs.mkdirSync(metadataDirectory, { recursive: true });

let seed = 0x48_4f_50_45;
const noise = () => {
  seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
  return (seed / 0xffff_ffff) * 2 - 1;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const expEnvelope = (phase, decay) => (phase >= 0 ? Math.exp(-decay * phase) : 0);

const sceneEnergy = (time) => {
  if (time < 4) return 0.42;
  if (time < 8.5) return 0.68;
  if (time < 17.5) return 0.96;
  if (time < 22) return 0.56;
  return 1;
};

const transitionTimes = [4, 8.5, 13, 17.5, 22];
const roots = [55, 65.406, 48.999, 73.416];
const pcm = new Float32Array(frameCount * CHANNELS);

for (let index = 0; index < frameCount; index += 1) {
  const time = index / SAMPLE_RATE;
  const energy = sceneEnergy(time);
  const beatPhase = time % 0.5;
  const eighthPhase = time % 0.25;
  const barPhase = time % 2;
  const barIndex = Math.floor(time / 2);
  const rootFrequency = roots[barIndex % roots.length];

  const kickFrequency = 48 + 112 * Math.exp(-34 * beatPhase);
  const kickPhase = TAU * (48 * beatPhase + (112 * (1 - Math.exp(-34 * beatPhase))) / 34);
  const kick = Math.sin(kickPhase) * expEnvelope(beatPhase, 24) * (barPhase < 0.04 ? 1.08 : 0.72);

  const snareOffset = Math.min(
    Math.abs(barPhase - 0.5),
    Math.abs(barPhase - 1.5),
  );
  const snare = snareOffset < 0.16
    ? noise() * expEnvelope(snareOffset, 24) * 0.23 * energy
    : 0;

  const hat = eighthPhase < 0.045
    ? noise() * expEnvelope(eighthPhase, 82) * 0.075 * (time > 3.75 ? energy : 0.25)
    : 0;

  const pad = (
    Math.sin(TAU * rootFrequency * time) * 0.55
    + Math.sin(TAU * rootFrequency * 1.5 * time) * 0.24
    + Math.sin(TAU * rootFrequency * 2 * time) * 0.14
  ) * 0.085;

  const arpStep = Math.floor(time / 0.25) % 8;
  const arpRatios = [1, 1.5, 2, 2.25, 2, 1.5, 1.25, 1.5];
  const arpEnvelope = Math.exp(-7 * eighthPhase);
  const arp = Math.sin(TAU * rootFrequency * arpRatios[arpStep] * time)
    * arpEnvelope
    * 0.07
    * (time > 4 ? energy : 0.16);

  let impact = 0;
  for (const transitionTime of transitionTimes) {
    const delta = time - transitionTime;
    if (delta >= 0 && delta < 0.22) {
      impact += (
        Math.sin(TAU * 88 * delta) * 0.28
        + noise() * 0.11
      ) * expEnvelope(delta, 18);
    }
  }

  const finalHitDelta = time - 27.5;
  if (finalHitDelta >= 0) {
    impact += Math.sin(TAU * 55 * finalHitDelta) * expEnvelope(finalHitDelta, 9) * 0.36;
  }

  const fadeIn = clamp(time / 0.35, 0, 1);
  const fadeOut = clamp((DURATION_SECONDS - time) / 0.48, 0, 1);
  const master = fadeIn * fadeOut;
  const center = (kick * 0.34 * energy + snare + pad + impact) * master;
  const left = center + (hat * 0.78 + arp * 0.92) * master;
  const right = center + (hat * 1.08 + arp * 1.08) * master;

  pcm[index * 2] = left;
  pcm[index * 2 + 1] = right;
}

let peak = 0;
for (const sample of pcm) peak = Math.max(peak, Math.abs(sample));
const gain = peak > 0 ? 0.92 / peak : 1;
const dataSize = frameCount * CHANNELS * 2;
const buffer = Buffer.alloc(44 + dataSize);

buffer.write("RIFF", 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(CHANNELS, 22);
buffer.writeUInt32LE(SAMPLE_RATE, 24);
buffer.writeUInt32LE(SAMPLE_RATE * CHANNELS * 2, 28);
buffer.writeUInt16LE(CHANNELS * 2, 32);
buffer.writeUInt16LE(16, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(dataSize, 40);

for (let index = 0; index < pcm.length; index += 1) {
  const normalized = clamp(pcm[index] * gain, -1, 1);
  buffer.writeInt16LE(Math.round(normalized * 32_767), 44 + index * 2);
}

fs.writeFileSync(outputPath, buffer);
fs.writeFileSync(
  path.join(metadataDirectory, "soundtrack-metadata.json"),
  `${JSON.stringify({
    title: "Continuity Signal",
    original: true,
    composer: "Generated in-repo for Hope Atina's portfolio film",
    sampleRate: SAMPLE_RATE,
    channels: CHANNELS,
    durationSeconds: DURATION_SECONDS,
    targetBpm: 120,
    structuralBeatsSeconds: transitionTimes,
    file: "public/video/portfolio-film/continuity-score.wav",
  }, null, 2)}\n`,
);

console.log(`Wrote ${outputPath}`);
