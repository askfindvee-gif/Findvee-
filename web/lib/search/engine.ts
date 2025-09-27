import { searchIndex, type SearchItem } from '../../data/searchIndex';
import { normalizeText, synonymDictionary } from '../../data/synonyms';

const EXACT_MATCH_WEIGHT = 3.0;
const INTENT_WEIGHT = 1.5;
const PROXIMITY_WEIGHT = 1.2;
const POPULARITY_WEIGHT = 1.0;
const RELIABILITY_WEIGHT = 0.8;
const FRESHNESS_WEIGHT = 0.6;
const CATALOG_WEIGHT = 0.5;
const CLOSED_PENALTY = -1.0;
const LOW_CTR_PENALTY = -0.5;

const NEAR_ME_PHRASES = [
  'near me',
  'close by',
  'around me',
  'ಹತ್ತಿರ',
  'पास में',
  'mere paas',
];

const LOCATION_VOCABULARY = new Set([
  'udupi',
  'manipal',
  'kundapura',
  'koteshwara',
  'malpe',
  'saligrama',
  'kaup',
]);

const CONTEXT_DEFAULT_LOCALITY = 'udupi';

type NormalisedIndexEntry = {
  item: SearchItem;
  normalised: string;
  normalisedTitle: string;
  normalisedPhrases: string[];
};

const indexWithNormalised: NormalisedIndexEntry[] = searchIndex.map((item) => ({
  item,
  normalised: normalizeText(
    [item.title, item.subtitle, item.description, ...item.keywords, ...item.catalogTags].join(' '),
  ),
  normalisedTitle: normalizeText(item.title),
  normalisedPhrases: item.exactPhrases.map((phrase) => normalizeText(phrase)),
}));

type QueryResolution = {
  raw: string;
  normalised: string;
  tokens: string[];
  canonicalTokens: string[];
  highlightTokens: Set<string>;
  didYouMean: string | null;
  isNearMe: boolean;
  matchedLocations: Set<string>;
};

function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) {
    matrix[i][0] = i;
  }
  for (let j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function findClosestTerm(term: string, vocabulary: Set<string>): string | null {
  let best: { value: string; distance: number } | null = null;
  for (const candidate of vocabulary) {
    const distance = levenshtein(term, candidate);
    if (distance <= 2 && (best === null || distance < best.distance)) {
      best = { value: candidate, distance };
      if (distance === 0) break;
    }
  }
  return best?.value ?? null;
}

function resolveQuery(rawQuery: string): QueryResolution {
  const normalisedBase = normalizeText(rawQuery);
  let working = normalisedBase;
  let didYouMean: string | null = null;
  const replacements = new Map<string, string>();
  let isNearMe = false;
  let shouldSuggest = false;

  for (const phrase of NEAR_ME_PHRASES) {
    const normalisedPhrase = normalizeText(phrase);
    if (normalisedPhrase && working.includes(normalisedPhrase)) {
      working = working.replaceAll(normalisedPhrase, ' ');
      isNearMe = true;
      shouldSuggest = true;
    }
  }

  const sortedPhrases = Array.from(synonymDictionary.phrases.entries()).sort(
    (a, b) => b[0].length - a[0].length,
  );

  for (const [phrase, canonical] of sortedPhrases) {
    if (phrase && working.includes(phrase)) {
      working = working.replaceAll(phrase, canonical);
      replacements.set(phrase, canonical);
      shouldSuggest = true;
    }
  }

  const rawTokens = working
    .split(' ')
    .map((token) => token.trim())
    .filter(Boolean);

  const canonicalTokens: string[] = [];
  const highlightTokens = new Set<string>();
  const matchedLocations = new Set<string>();

  for (const token of rawTokens) {
    highlightTokens.add(token);
    let canonical = token;

    if (synonymDictionary.singleWord.has(token)) {
      canonical = synonymDictionary.singleWord.get(token)!;
    } else if (synonymDictionary.vocabulary.has(token) || LOCATION_VOCABULARY.has(token)) {
      canonical = token;
    } else {
      const closest = findClosestTerm(token, synonymDictionary.vocabulary);
      if (closest) {
        canonical = closest;
        shouldSuggest = true;
      }
    }

    canonicalTokens.push(canonical);
    highlightTokens.add(canonical);

    if (LOCATION_VOCABULARY.has(canonical)) {
      matchedLocations.add(canonical);
    }

    if (canonical !== token) {
      shouldSuggest = true;
    }
  }

  const suggestionTokens = canonicalTokens.join(' ').trim();
  if (suggestionTokens) {
    const suggestion = `${suggestionTokens}${isNearMe ? (suggestionTokens ? ' near me' : 'near me') : ''}`.trim();
    if (suggestion && suggestion !== normalisedBase && (shouldSuggest || replacements.size > 0)) {
      didYouMean = suggestion;
    }
  }

  return {
    raw: rawQuery,
    normalised: normalisedBase,
    tokens: rawTokens,
    canonicalTokens,
    highlightTokens,
    didYouMean,
    isNearMe,
    matchedLocations,
  };
}

type RankedResult = {
  item: SearchItem;
  score: number;
};

function computeScore(query: QueryResolution, bucket: NormalisedIndexEntry): number {
  const { item, normalised, normalisedTitle, normalisedPhrases } = bucket;
  const canonicalTokens = query.canonicalTokens;
  if (canonicalTokens.length === 0 && !query.normalised) {
    return item.popularity * POPULARITY_WEIGHT + item.reliability * RELIABILITY_WEIGHT;
  }

  let score = 0;
  const tokensToCheck = canonicalTokens.length > 0 ? canonicalTokens : query.tokens;

  if (
    query.normalised &&
    (normalisedTitle === query.normalised || normalisedPhrases.includes(query.normalised))
  ) {
    score += EXACT_MATCH_WEIGHT;
  }

  const keywordSet = new Set(item.keywords.map((keyword) => normalizeText(keyword)));
  const intentSet = new Set(item.intents.map((intent) => normalizeText(intent)));
  const catalogSet = new Set(item.catalogTags.map((catalog) => normalizeText(catalog)));

  let matchedIntentCount = 0;
  let matchedCatalog = 0;

  for (const token of tokensToCheck) {
    if (!token) continue;
    if (keywordSet.has(token) || intentSet.has(token)) {
      matchedIntentCount += 1;
    }
    if (catalogSet.has(token)) {
      matchedCatalog += 1;
    }
  }

  if (matchedIntentCount > 0) {
    score += matchedIntentCount * INTENT_WEIGHT;
  }

  if (matchedCatalog > 0) {
    score += matchedCatalog * CATALOG_WEIGHT;
  }

  const localityBonus = query.matchedLocations.size
    ? [...query.matchedLocations].some((location) => item.localities.includes(location))
      ? 0.6
      : 0
    : item.localities.includes(CONTEXT_DEFAULT_LOCALITY)
    ? 0.3
    : 0;

  score += localityBonus;

  const proximityNormaliser = query.isNearMe ? 10000 : 20000;
  const distanceFactor = Math.max(0, 1 - Math.min(item.proximityMeters, proximityNormaliser) / proximityNormaliser);
  score += distanceFactor * (query.isNearMe ? PROXIMITY_WEIGHT : PROXIMITY_WEIGHT / 2);

  score += item.popularity * POPULARITY_WEIGHT;
  score += item.reliability * RELIABILITY_WEIGHT;
  score += item.freshness * FRESHNESS_WEIGHT;

  if (!item.isOpen) {
    score += CLOSED_PENALTY;
  }

  if (item.clickThroughRate < 0.35) {
    score += LOW_CTR_PENALTY;
  }

  const normalisedTokens = tokensToCheck.filter(Boolean);
  if (normalisedTokens.length > 0) {
    const combinedQuery = normalizeText(normalisedTokens.join(' '));
    if (combinedQuery && normalised.includes(combinedQuery)) {
      score += 0.4;
    }
  }

  return score;
}

export type RankedSearchItem = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  score: number;
  badges?: string[];
  distance_m: number | null;
  category: string;
  primary_action?: { label: string; href: string } | null;
  highlight: string[];
};

export type SearchOutcome = {
  query: string;
  exact: boolean;
  results: RankedSearchItem[];
  didYouMean: string | null;
};

export type SearchOptions = {
  limit?: number;
  forceNearMe?: boolean;
};

export function runSearch(query: string, options: SearchOptions = {}): SearchOutcome {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: '', exact: false, results: [], didYouMean: null };
  }

  const resolution = resolveQuery(trimmed);
  if (options.forceNearMe) {
    resolution.isNearMe = true;
  }
  const limit = Math.max(1, options.limit ?? 20);

  const ranked = indexWithNormalised
    .map<RankedResult>((entry) => ({
      item: entry.item,
      score: computeScore(resolution, entry),
    }))
    .filter((result) => result.score > 0.4)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  const results: RankedSearchItem[] = ranked.map(({ item, score }) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    href: item.href,
    score: Number(score.toFixed(2)),
    badges: item.badges,
    distance_m: Number.isFinite(item.proximityMeters) ? Math.round(item.proximityMeters) : null,
    category: item.category,
    primary_action: item.primaryAction ?? null,
    highlight: Array.from(resolution.highlightTokens),
  }));

  const exact =
    results.length > 0 &&
    (results[0].title && normalizeText(results[0].title) === resolution.normalised
      ? true
      : searchIndex
          .find((item) => item.id === results[0].id)
          ?.exactPhrases.map((phrase) => normalizeText(phrase))
          .includes(resolution.normalised) ?? false);

  return {
    query: trimmed,
    exact,
    results,
    didYouMean: resolution.didYouMean,
  };
}

export function getTrending(limit = 8): RankedSearchItem[] {
  return indexWithNormalised
    .slice()
    .sort((a, b) => b.item.popularity - a.item.popularity)
    .slice(0, Math.max(1, limit))
    .map(({ item }) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      href: item.href,
      score: Number((item.popularity * POPULARITY_WEIGHT + item.reliability * RELIABILITY_WEIGHT).toFixed(2)),
      badges: item.badges,
      distance_m: Number.isFinite(item.proximityMeters) ? Math.round(item.proximityMeters) : null,
      category: item.category,
      primary_action: item.primaryAction ?? null,
      highlight: [],
    }));
}
