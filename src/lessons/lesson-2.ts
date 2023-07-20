import { ChallengeType } from "../components/Challenge/Challenge";


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