'use client';

import type { VoiceController, VoiceHooks } from '../createVoiceController';

type RecognitionAlternative = { transcript: string };
type RecognitionResult = { isFinal: boolean; 0: RecognitionAlternative };
type RecognitionResultEvent = { results: RecognitionResult[] };
type RecognitionErrorEvent = { error?: string };

type BrowserSpeechRecognition = {
  new (): {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start: () => void;
    stop: () => void;
    onresult: (event: RecognitionResultEvent) => void;
    onerror: (event: RecognitionErrorEvent) => void;
    onend: () => void;
  };
};

export function createWebSpeechVoice({ onInterim, onFinal, onError, lang }: VoiceHooks): VoiceController {
  const Recognition =
    (window as typeof window & { SpeechRecognition?: BrowserSpeechRecognition; webkitSpeechRecognition?: BrowserSpeechRecognition })
      .SpeechRecognition ||
    (window as typeof window & { SpeechRecognition?: BrowserSpeechRecognition; webkitSpeechRecognition?: BrowserSpeechRecognition })
      .webkitSpeechRecognition;

  if (!Recognition) {
    throw new Error('Voice search not supported in this browser');
  }

  const recognition = new Recognition();
  recognition.lang = lang || document.documentElement.lang || 'en-US';
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onresult = (event: RecognitionResultEvent) => {
    let interim = '';
    let final = '';
    for (let i = 0; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (result.isFinal) {
        final += result[0].transcript;
      } else {
        interim += result[0].transcript;
      }
    }

    if (interim) {
      onInterim(interim.trim());
    }
    if (final) {
      onFinal(final.trim());
    }
  };

  recognition.onerror = (event: RecognitionErrorEvent) => {
    if (onError) {
      onError(new Error(event.error || 'voice_error'));
    }
  };

  recognition.onend = () => {
    onInterim('');
  };

  return {
    start() {
      try {
        recognition.start();
      } catch (error) {
        console.warn('Voice recognition start failed', error);
      }
    },
    stop() {
      try {
        recognition.stop();
      } catch (error) {
        console.warn('Voice recognition stop failed', error);
      }
    },
  };
}
