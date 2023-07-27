import { ChallengeType } from "../components/Challenge/types";


export const challenges = [
  {
    type: ChallengeType.WORD_PICTURE,
    data: {
      word: 'jabuka',
      answer: 'apple',
      images: ['apple', 'apricot', 'peach']
    }
  },
  {
    type: ChallengeType.WORD_PICTURE,
    data: {
      word: 'kaisija',
      answer: 'apricot',
      images: ['apple', 'apricot', 'strawberry']
    }
  },
  {
    type: ChallengeType.WORD_PICTURE,
    data: {
      word: 'breskva',
      answer: 'peach',
      images: ['pear', 'apricot', 'peach']
    }
  },
  {
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je jagoda'],
      chips: ['jagoda', 'breskva', 'Ovo', 'je', 'su'],
      image: 'strawberry',
    },
  },
  {
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo su jabuka i kruška', 'Ovo su kruška i jabuka'],
      chips: ['jabuka', 'Ovo', 'je', 'su', 'i', 'kruška'],
      image: 'apple-pear',
    }
  },
  {
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je kruška'],
      chips: ['jabuka', 'Ovo', 'je', 'su', 'kruška'],
      image: 'pear',
    }
  }
];