// Same rhythm as the mulbit icon: smooth half-cycles of 14 units, alternating above and
// below the centre line. Amplitudes follow a speech-like envelope instead of a sine.
export const AMPS = [
  4, 14, 30, 27, 18, 9, 20, 33, 25, 12, 6, 3, 10, 24, 31, 22, 14, 21, 12, 5,
  2, 8, 19, 28, 20, 26, 15, 8, 4, 12, 22, 16, 9, 4, 2, 6, 13, 9, 4, 2,
];
export const SEG = 14;
export const WAVE_H = 80;
export const WAVE_W = (AMPS.length + 1) * SEG;

const MID = WAVE_H / 2;

/** SVG path for the waveform; gain(i) scales each half-cycle. */
export function wavePath(gain: (i: number) => number) {
  let x = 0;
  let y = MID;
  let d = `M0 ${MID}`;
  AMPS.forEach((a, i) => {
    const amp = a * gain(i);
    const ny = MID + (i % 2 ? -amp : amp);
    d += ` C${x + 5} ${y.toFixed(1)} ${x + 9} ${ny.toFixed(1)} ${x + SEG} ${ny.toFixed(1)}`;
    x += SEG;
    y = ny;
  });
  return d + ` C${x + 5} ${y.toFixed(1)} ${x + 9} ${MID} ${x + SEG} ${MID}`;
}
