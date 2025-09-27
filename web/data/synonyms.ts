export type SynonymGroup = {
  canonical: string;
  variants: string[];
};

export const synonymGroups: SynonymGroup[] = [
  {
    canonical: 'restaurant',
    variants: [
      'restaurants',
      'diner',
      'diners',
      'eatery',
      'eateries',
      'cafe',
      'cafes',
      'café',
      'canteen',
      'hotels and restaurants',
      'ಉಪಹಾರ ಗೃಹ',
      'ರೆಸ್ಟೋರಂಟ್',
      'रेस्टोरेंट',
    ],
  },
  {
    canonical: 'veg',
    variants: [
      'vegetarian',
      'plant based',
      'plant-based',
      'meat free',
      'meat-free',
      'ಸಸ್ಯಾಹಾರಿ',
      'शाकाहारी',
    ],
  },
  {
    canonical: 'non-veg',
    variants: [
      'non vegetarian',
      'non-vegetarian',
      'meat serving',
      'meat-serving',
      'मांसाहारी',
      'ನಾನ್ ವೇಜ್',
    ],
  },
  {
    canonical: 'grocery',
    variants: [
      'groceries',
      'supermarket',
      'super market',
      'super mart',
      'hypermarket',
      'food mart',
      'corner shop',
      'bodega',
      'kirana',
      'ಕಿರಾಣಿ ಅಂಗಡಿ',
      'किराना',
    ],
  },
  {
    canonical: 'general store',
    variants: [
      'convenience store',
      'convenience stores',
      'mini mart',
      'mini-mart',
      'kiosk',
      'ಪೀಠಿಕೆ ಅಂಗಡಿ',
    ],
  },
  {
    canonical: 'pharmacy',
    variants: [
      'pharmacies',
      'chemist',
      'chemist shop',
      'drugstore',
      'drug store',
      'apothecary',
      'dispensary',
      'med store',
      'medical shop',
      'ಔಷಧಿ ಅಂಗಡಿ',
      'ಔಷಧಾಲಯ',
      'औषधि की दुकान',
      'दवा की दुकान',
    ],
  },
  {
    canonical: 'hospital',
    variants: [
      'clinic',
      'medical center',
      'medical centre',
      'healthcare',
      'health care',
      'ಆಸ್ಪತ್ರೆ',
      'अस्पताल',
    ],
  },
  {
    canonical: 'doctor',
    variants: [
      'physician',
      'general physician',
      'gp',
      'practitioner',
      'ಡಾಕ್ಟರ್',
      'ವೈದ್ಯ',
      'डॉक्टर',
    ],
  },
  {
    canonical: 'auto',
    variants: [
      'autorickshaw',
      'auto rickshaw',
      'rickshaw',
      'three wheeler',
      'three-wheeler',
      'tuk tuk',
      'tuk-tuk',
      'bajaj',
      'ಆಟೋ',
      'ರಿಕ್ಷಾ',
      'ऑटो',
    ],
  },
  {
    canonical: 'taxi',
    variants: [
      'cab',
      'cab service',
      'ride',
      'ride hailing',
      'ride-hailing',
      'uber',
      'lyft',
      'ola',
      'ಟ್ಯಾಕ್ಸಿ',
      'काब',
    ],
  },
  {
    canonical: 'bus',
    variants: ['coach', 'shuttle', 'बस सेवा', 'ಬಸ್'],
  },
  {
    canonical: 'truck',
    variants: ['lorry', 'freight vehicle', 'ಟ್ರಕ್', 'ಲಾರಿ'],
  },
  {
    canonical: 'pet care',
    variants: [
      'petcare',
      'vet',
      'veterinarian',
      'animal hospital',
      'pet clinic',
      'ಪೆಟ್ ಕೇರ್',
      'पशु चिकित्सक',
    ],
  },
  {
    canonical: 'pet store',
    variants: [
      'pet shop',
      'animal supplies',
      'pet supplies',
      'ಪಶು ಸರಬರಾಜು',
      'पालतू दुकान',
    ],
  },
  {
    canonical: 'hotel',
    variants: [
      'motel',
      'inn',
      'guesthouse',
      'guest house',
      'hostel',
      'bnb',
      'lodging',
      'resort',
      'stay',
      'ಆತಿಥ್ಯ',
      'होटल',
    ],
  },
  {
    canonical: 'pg',
    variants: [
      'paying guest',
      'shared accommodation',
      'boarding',
      'pg stay',
      'ಪಿಜಿ',
      'पीजी',
    ],
  },
  {
    canonical: 'delivery',
    variants: [
      'home delivery',
      'takeaway',
      'take away',
      'takeout',
      'take out',
      'parcel',
      'डिलीवरी',
      'ಡೆಲಿವರಿ',
    ],
  },
  {
    canonical: 'order food',
    variants: [
      'food delivery',
      'online ordering',
      'order food online',
      'ಭೋಜನ ಆರ್ಡರ್',
      'खाना आर्डर',
    ],
  },
  {
    canonical: 'gym',
    variants: [
      'fitness center',
      'fitness centre',
      'health club',
      'workout studio',
      'ಜಿಮ್',
      'फिटनेस',
    ],
  },
  {
    canonical: 'spa',
    variants: [
      'wellness center',
      'wellness centre',
      'massage parlor',
      'ಮಸಾಜ್ ಕೇಂದ್ರ',
      'स्पा',
    ],
  },
  {
    canonical: 'recharge',
    variants: [
      'utility payment',
      'utility bill',
      'bill payment',
      'prepaid recharge',
      'mobile recharge',
      'ಬಿಲ್ ಪಾವತಿ',
      'रीचार्ज',
    ],
  },
];

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{Letter}\p{Number}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export type SynonymDictionary = {
  singleWord: Map<string, string>;
  phrases: Map<string, string>;
  vocabulary: Set<string>;
};

export const synonymDictionary: SynonymDictionary = (() => {
  const singleWord = new Map<string, string>();
  const phrases = new Map<string, string>();
  const vocabulary = new Set<string>();

  const register = (term: string, canonical: string) => {
    const normal = normalizeText(term);
    if (!normal) return;
    vocabulary.add(canonical);
    if (normal.includes(' ')) {
      phrases.set(normal, canonical);
    } else {
      singleWord.set(normal, canonical);
    }
  };

  for (const group of synonymGroups) {
    const canonical = normalizeText(group.canonical);
    register(group.canonical, canonical);
    for (const variant of group.variants) {
      register(variant, canonical);
    }
  }

  return { singleWord, phrases, vocabulary };
})();
