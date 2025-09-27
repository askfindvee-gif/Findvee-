declare module 'wav-encoder' {
  type EncodeInput = {
    sampleRate: number;
    channelData: Float32Array[];
  };

  interface WavEncoderModule {
    encode(input: EncodeInput): Promise<ArrayBuffer>;
  }

  const wavEncoder: WavEncoderModule;
  export default wavEncoder;
}
