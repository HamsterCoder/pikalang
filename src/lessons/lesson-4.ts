import {
  ChallengeDescription,
  ChallengeType,
} from '../components/Challenge/types';

// TARGET WORDS: ja sam, ti si, on/ona/one je, mi smo, vi ste, oni/one/ona su
// SECONDARY WORDS:
// umoran, spreman, srećan, lep
// porodica, drug, drugovi, drugarica, drugarice, prijatelji, prijateljnice, deca

// Ja ✅ | Mi ✅ ✅
// Ti ✅ | Vi ✅ ✅
// On ✅ | Oni ✅ ✅
// Ona ✅| One ✅ ✅
// Ono ✅ | Ona ✅

const combinedChallenges: ChallengeDescription[] = [
  // Singular
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ja {sam} umoran.',
      translation: 'Я устал(а).',
      chips: ['sam', 'si'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ti {si} srećan.',
      translation: 'Ты счастлив(а).',
      chips: ['si', 'ste'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'On {je} spreman.',
      translation: 'Он готов.',
      chips: ['je', 'sam'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ona {je} moja drugarica.',
      translation: 'Она моя приятельница.',
      chips: ['je', 'su'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ono {je} lepo.',
      translation: 'Оно красивое.',
      chips: ['je', 'si'],
    },
  },
  // Plural
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Mi {smo} porodica.',
      translation: 'Мы семья.',
      chips: ['smo', 'su'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Vi {ste} porodica.',
      translation: 'Вы ceмья.',
      chips: ['ste', 'su'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Oni {su} drugovi.',
      translation: 'Они приятели.',
      chips: ['su', 'ste'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'One {su} prijateljnice.',
      translation: 'Они подруги.',
      chips: ['su', 'ste'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ona {su} deca.',
      translation: 'Они дети.',
      chips: ['su', 'ste'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Mi {smo} porodica. Oni {su} prijatelji.',
      translation: 'Мы семья. Они друзья.',
      chips: ['smo', 'su'],
    },
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Vi {ste} deca. One {su} drugarice.',
      translation: 'Мы семья. Они приятельницы.',
      chips: ['ste', 'su'],
    },
  },
];

export const challenges: ChallengeDescription[] = [...combinedChallenges];
