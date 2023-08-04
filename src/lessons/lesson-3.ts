import { ChallengeDescription, ChallengeType } from "../components/Challenge/types";

export const challenges: ChallengeDescription[] = [
  {
    type: ChallengeType.TRANSLATE_CHIPS,
    data: {
      sentence: 'Ovo je malina',
      answer: ['This is a raspberry'],
      chips: ['strawberry', 'is', 'a', 'raspberry', 'This']
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
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je jagoda'],
      chips: ['jagoda', 'breskva', 'Ovo', 'je', 'su'],
      image: 'strawberry',
    },
  },
  {
    type: ChallengeType.TRANSLATE_CHIPS,
    data: {
      sentence: 'Ovo su jagoda i malina',
      answer: ['These are a strawberry and a raspberry'],
      chips: ['a', 'This', 'These', 'are', 'and', 'strawberry', 'a', 'raspberry', 'apple']
    }
  },
  {
    type: ChallengeType.TRANSLATE_CHIPS,
    data: {
      sentence: 'Ovo je kupina',
      answer: ['This is a blackberry'],
      chips: ['This', 'strawberry', 'is', 'a', 'blackberry']
    }
  },
  {
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je kupina'],
      chips: ['Ovo', 'malina', 'kupina', 'je'],
      image: 'blackberry',
    }
  },
  {
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je malina'],
      chips: ['Ovo', 'malina', 'jagoda', 'je'],
      image: 'raspberry',
    }
  },
  {
    type: ChallengeType.QUESTION_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je borovnica'],
      chips: ['Ovo', 'borovnica', 'kupina', 'je'],
      image: 'blueberry',
    }
  },
];