export function resample(
  samples: ReadonlyArray<number>,
  inputSampleRate: number,
  outputSampleRate: number
): ReadonlyArray<number> {
  if (inputSampleRate > outputSampleRate) {
    const inputSamplesPerOutputSample = inputSampleRate / outputSampleRate;

    const output: number[] = [];

    let start = 0;

    while (start < samples.length - inputSamplesPerOutputSample) {
      const end = start + inputSamplesPerOutputSample;

      const startSample = Math.floor(start);

      const startSampleProgress = start - startSample;

      const endSample = Math.floor(end);

      const endSampleProgress = end - endSample;

      const total =
        (samples[startSample] * (1 - startSampleProgress) +
          samples
            .slice(startSample + 1, endSample - 1)
            .reduce((a, b) => a + b, 0) +
          samples[endSample] * endSampleProgress) /
        inputSamplesPerOutputSample;

      output.push(total);

      start = end;
    }

    return output;
  } else if (outputSampleRate > inputSampleRate) {
    const outputSamplesPerInputSample = outputSampleRate / inputSampleRate;

    const output: number[] = [];

    const targetLength = Math.floor(
      (samples.length - 1) * outputSamplesPerInputSample
    );

    while (output.length < targetLength) {
      const inputSample = output.length / outputSamplesPerInputSample;

      const earlierIndex = Math.floor(inputSample);
      const laterIndex = earlierIndex + 1;

      const laterWeight = inputSample - earlierIndex;
      const earlierWeight = 1 - laterWeight;

      const earlierSample = samples[earlierIndex];
      const laterSample = samples[laterIndex];

      output.push(earlierSample * earlierWeight + laterSample * laterWeight);
    }

    return output;
  } else {
    return samples;
  }
}
