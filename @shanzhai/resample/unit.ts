import * as fs from "fs";
import * as path from "path";
import * as nodeWav from "node-wav";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fftJs = require(`fft-js`);
import { resample } from ".";

const segmentLength = 8192;

describe(`resample`, () => {
  let fromSamples: ReadonlyArray<number>;
  let fromSampleRate: number;
  let analyses: ReadonlyArray<{
    readonly start: number;
    readonly samples: ReadonlyArray<number>;
    readonly results: ReadonlyArray<{
      readonly frequency: number;
      readonly magnitude: number;
    }>;
  }>;

  beforeAll(async () => {
    const encoded = await fs.promises.readFile(
      path.join(__dirname, `test-data`, `sample.wav`)
    );
    const decoded = nodeWav.decode(encoded);

    expect(decoded.channelData.length).toEqual(1);

    fromSamples = [...decoded.channelData[0]];
    fromSampleRate = decoded.sampleRate;

    const analysesValue: {
      readonly start: number;
      readonly samples: ReadonlyArray<number>;
      readonly results: ReadonlyArray<{
        readonly frequency: number;
        readonly magnitude: number;
      }>;
    }[] = [];

    for (
      let start = 0;
      start < fromSamples.length - segmentLength;
      start += segmentLength
    ) {
      const samples = fromSamples.slice(start, start + segmentLength);

      const phasors = fftJs.fft(samples);
      const frequencies = fftJs.util.fftFreq(phasors, fromSampleRate);
      const magnitudes = fftJs.util.fftMag(phasors);

      const results: {
        readonly frequency: number;
        readonly magnitude: number;
      }[] = [];

      for (let i = 0; i < frequencies.length; i++) {
        results.push({ frequency: frequencies[i], magnitude: magnitudes[i] });
      }

      analysesValue.push({ start, samples, results });
    }

    analyses = analysesValue;
  });

  function scenario(
    description: string,
    ratio: number,
    roundedRatio: number
  ): void {
    describe(description, () => {
      let adjustedSampleRate: number;
      let reduced: ReadonlyArray<number>;

      beforeAll(() => {
        adjustedSampleRate = fromSampleRate * ratio;

        reduced = resample(fromSamples, fromSampleRate, adjustedSampleRate);
      });

      it(`produces a sample of the expected length`, () => {
        const target = fromSamples.length * ratio;
        expect(reduced.length).toBeGreaterThan(target - 5);
        expect(reduced.length).toBeLessThan(target + 5);
      });

      it(`produces values within the expected range`, () => {
        for (const sample of reduced) {
          expect(sample).toBeGreaterThanOrEqual(-1);
          expect(sample).toBeLessThanOrEqual(1);
        }
      });

      it(`produces a similar set of frequencies`, async () => {
        for (const analysis of analyses) {
          const adjustedStart = Math.floor(analysis.start * ratio);
          const segment = reduced.slice(
            adjustedStart,
            adjustedStart + segmentLength * roundedRatio
          );

          const toPhasors = fftJs.fft(segment);
          const toFrequencies = fftJs.util.fftFreq(
            toPhasors,
            adjustedSampleRate
          );
          const toMagnitudes = fftJs.util.fftMag(toPhasors);

          let hits = 0;

          for (const result of analysis.results) {
            let indexOfClosest = 0;
            let distanceOfClosest = Infinity;

            for (let i = 0; i < toFrequencies.length; i++) {
              const distance = Math.abs(result.frequency - toFrequencies[i]);

              if (distance < distanceOfClosest) {
                indexOfClosest = i;
                distanceOfClosest = distance;
              }
            }

            // It is not clear which units these magnitudes are in, but when
            // comparing the original audio to white noise, values were
            // consistently over 90.
            if (
              Math.abs(toMagnitudes[indexOfClosest] - result.magnitude) < 15
            ) {
              hits++;
            }
          }

          expect(hits).toBeGreaterThan(analysis.results.length * 0.9);
        }
      });
    });
  }

  scenario(`when reducing the sample rate`, 0.235, 0.25);
  scenario(`when not changing the sample rate`, 1, 1);
  scenario(`when increasing the sample rate`, 4.152, 4);
});
