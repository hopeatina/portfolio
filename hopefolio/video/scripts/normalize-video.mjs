import { spawnSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const input = path.join(root, "video/output/hope-atina-portfolio-social.mp4");
const output = path.join(root, "video/output/hope-atina-portfolio-social-final.mp4");

const run = (args, capture = false) => {
  const result = spawnSync("ffmpeg", args, {
    cwd: root,
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });

  if (result.status !== 0) {
    throw new Error(capture ? result.stderr : `ffmpeg exited with status ${result.status}`);
  }

  return result;
};

const analysis = run([
  "-hide_banner",
  "-nostats",
  "-i",
  input,
  "-af",
  "loudnorm=I=-14:TP=-1:LRA=7:print_format=json",
  "-f",
  "null",
  "-",
], true);

const measurementMatch = analysis.stderr.match(/\{\s*"input_i"[\s\S]*?\}/);
if (!measurementMatch) {
  throw new Error("Could not parse ffmpeg loudness measurements.");
}

const measured = JSON.parse(measurementMatch[0]);
const loudnessFilter = [
  "loudnorm=I=-14",
  "TP=-1",
  "LRA=7",
  `measured_I=${measured.input_i}`,
  `measured_TP=${measured.input_tp}`,
  `measured_LRA=${measured.input_lra}`,
  `measured_thresh=${measured.input_thresh}`,
  `offset=${measured.target_offset}`,
  "linear=false",
  "print_format=summary",
].join(":");

run([
  "-y",
  "-hide_banner",
  "-loglevel",
  "warning",
  "-i",
  input,
  "-map",
  "0:v:0",
  "-map",
  "0:a:0",
  "-c:v",
  "copy",
  "-af",
  loudnessFilter,
  "-ar",
  "48000",
  "-c:a",
  "aac",
  "-b:a",
  "320k",
  "-movflags",
  "+faststart",
  output,
]);

console.log(`Wrote ${output}`);
