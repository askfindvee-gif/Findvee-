import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_KEY = process.env.GOOGLE_STT_KEY;

export async function POST(req: NextRequest) {
  if (!GOOGLE_KEY) {
    return NextResponse.json({ error: 'google_stt_not_configured' }, { status: 501 });
  }

  const form = await req.formData();
  const file = form.get('audio');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'no_audio' }, { status: 400 });
  }

  const lang = (form.get('lang') as string | null) ?? 'en-US';
  await file.arrayBuffer();

  // TODO: Integrate with Google Cloud Speech-to-Text using GOOGLE_STT_KEY credentials.
  // Placeholder response confirms the request pipeline without exposing credentials.
  return NextResponse.json({ text: '', lang });
}
