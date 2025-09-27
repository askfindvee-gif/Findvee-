'use client';

import type { VoiceController, VoiceHooks } from '../createVoiceController';

export async function createAzureVoice({ onInterim, onFinal, onError, lang }: VoiceHooks): Promise<VoiceController> {
  const sdk = await import('microsoft-cognitiveservices-speech-sdk');

  const key = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY || process.env.AZURE_SPEECH_KEY;
  const region = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION || process.env.AZURE_SPEECH_REGION;

  if (!key || !region) {
    throw new Error('Azure Speech credentials are not configured');
  }

  const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
  speechConfig.speechRecognitionLanguage = lang || 'en-US';

  const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  recognizer.recognizing = (_sender, event) => {
    if (event?.result?.text) {
      onInterim?.(event.result.text);
    }
  };

  recognizer.recognized = (_sender, event) => {
    if (event?.result?.text) {
      onFinal?.(event.result.text);
    }
  };

  recognizer.canceled = (_sender, event) => {
    if (event?.errorDetails && onError) {
      onError(new Error(event.errorDetails));
    }
  };

  recognizer.sessionStopped = () => {
    onInterim?.('');
  };

  return {
    start() {
      recognizer.startContinuousRecognitionAsync();
    },
    stop() {
      recognizer.stopContinuousRecognitionAsync();
    },
  };
}
