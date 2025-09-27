'use client';

export type VoiceHooks = {
  onInterim: (text: string) => void;
  onFinal: (text: string) => void;
  onError?: (error: Error) => void;
  lang?: string;
};

export type VoiceController = {
  start: () => void;
  stop: () => void;
};

export async function createVoiceController(hooks: VoiceHooks): Promise<VoiceController> {
  const provider = (process.env.NEXT_PUBLIC_VOICE_STT_PROVIDER || 'web').toLowerCase();

  if (provider === 'azure') {
    const module = await import('./providers/azure');
    return module.createAzureVoice(hooks);
  }

  if (provider === 'google') {
    const module = await import('./providers/google');
    return module.createGoogleVoice(hooks);
  }

  const module = await import('./providers/webspeech');
  return module.createWebSpeechVoice(hooks);
}
