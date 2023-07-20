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