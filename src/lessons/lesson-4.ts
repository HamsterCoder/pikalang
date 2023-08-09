import { ChallengeDescription, ChallengeType } from "../components/Challenge/types";

// TARGET WORDS: ja sam, ti si, on/ona/one je, mi smo, vi ste, oni/one/ona su
// SECONDARY WORDS: umoran, pun, energija, porodica, prijatelji

const combinedChallenges: ChallengeDescription[] = [
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ja {sam} umoran. Ti {si} pun energije.',
      answer: 'Ja sam umoran. Ti si pun energije.',
      translation: 'Я устал. Ты полон сил.',
      chips: ['sam', 'si']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Mi {smo} porodica. Oni {su} prijatelji.',
      answer: 'Mi smo porodica. Oni su prijatelji.',
      translation: 'Мы семья. Они друзья.',
      chips: ['smo', 'su']
    }
  },
];

export const challenges: ChallengeDescription[] = [
  ...combinedChallenges,
];