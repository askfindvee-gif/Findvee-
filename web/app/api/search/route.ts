import { NextRequest, NextResponse } from 'next/server';

import { runSearch } from '../../../lib/search/engine';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') ?? '').trim();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const limitParam = searchParams.get('limit');

  if (!q) {
    return NextResponse.json({ query: '', exact: false, results: [], didYouMean: null });
  }

  const limit = limitParam ? Math.max(1, Number.parseInt(limitParam, 10) || 0) : undefined;
  const forceNearMe = lat !== null && lng !== null && !Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng));

  const outcome = runSearch(q, { limit, forceNearMe });

  return NextResponse.json(outcome);
}
