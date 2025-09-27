'use client';

import type { VoiceController, VoiceHooks } from '../createVoiceController';

async function encodeToWav(chunks: Float32Array[], sampleRate: number) {
  const { default: WavEncoder } = await import('wav-encoder');
  const merged = Float32Array.from(chunks.flat());
  return WavEncoder.encode({ sampleRate, channelData: [merged] });
}

export async function createGoogleVoice({ onInterim, onFinal, onError, lang }: VoiceHooks): Promise<VoiceController> {
  if (!process.env.GOOGLE_STT_KEY && !process.env.NEXT_PUBLIC_GOOGLE_STT_KEY) {
    throw new Error('Google STT credentials are not configured');
  }

  const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(mediaStream);
  const processor = audioContext.createScriptProcessor(4096, 1, 1);

  const buffers: Float32Array[] = [];
  let recording = false;

  processor.onaudioprocess = (event) => {
    if (!recording) return;
    buffers.push(new Float32Array(event.inputBuffer.getChannelData(0)));
    onInterim?.('');
  };

  source.connect(processor);
  processor.connect(audioContext.destination);

  const stopMedia = async () => {
    processor.disconnect();
    source.disconnect();
    mediaStream.getTracks().forEach((track) => track.stop());
    await audioContext.close();
  };

  return {
    async start() {
      recording = true;
    },
    async stop() {
      if (!recording) return;
      recording = false;

      try {
        const wavBuffer = await encodeToWav(buffers, audioContext.sampleRate);
        const blob = new Blob([wavBuffer], { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', blob, 'voice.wav');
        formData.append('lang', lang || document.documentElement.lang || 'en-US');

        const response = await fetch('/api/stt/google', {
          method: 'POST',
          body: formData,
        });
        const payload = await response.json();

        if (payload?.text) {
          onFinal?.(payload.text);
        } else if (payload?.error && onError) {
          onError(new Error(payload.error));
        }
      } catch (error) {
        if (onError && error instanceof Error) {
          onError(error);
        }
      } finally {
        await stopMedia();
      }
    },
  };
}
