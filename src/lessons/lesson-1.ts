import { ChallengeType } from "../components/Challenge/Challenge";


export const challenges = [
  {
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je jabuka'],
      chips: ['Ovo', 'jabuka', 'kaisija', 'je'],
      image: 'apple',
    }
  },
  {
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je kaisija'],
      chips: ['Ovo', 'šljiva', 'kaisija', 'je'],
      image: 'apricot',
    }
  },
  {
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je breskva'],
      chips: ['Ovo', 'breskva', 'jabuka', 'je'],
      image: 'peach',
    }
  },
  {
    type: ChallengeType.WORD_PICTURE,
    data: {
      word: 'jagoda',
      answer: 'strawberry',
      images: ['pear', 'apricot', 'strawberry']
    },
  },
  {
    type: ChallengeType.WORD_PICTURE,
    data: {
      word: 'kruška',
      answer: 'pear',
      images: ['pear', 'apricot', 'strawberry']
    }
  }
];