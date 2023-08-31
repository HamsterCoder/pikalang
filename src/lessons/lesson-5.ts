import { ChallengeDescription, ChallengeType } from "../components/Challenge/types";

// TARGET WORDS
// nisam, nisi, nije, nismo, niste, nisu
// SECONDARY WORDS:
// mali, velik
// kod kuće, napolju, ovde
// grad,

// Ja ✅ Mi ✅
// Ti ✅ Vi ✅
// On ✅ Oni ✅
// Ona ✅ One ✅
// Ono ✅ Ona ✅

const combinedChallenges: ChallengeDescription[] = [
  // Singular
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ja {nisam} kod kuće.',
      translation: 'Я не дома.',
      chips: ['nisam', 'nisu']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ti {nisi} napolju.',
      translation: 'Ты не снаружи.',
      chips: ['nisi', 'nisam']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Beograd {nije} mali grad.',
      translation: 'Белград не маленький город.',
      chips: ['nije', 'nismo']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ona {nije} ovde.',
      translation: 'Она не здесь.',
      chips: ['nije', 'niste']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ono {nije} veliko.',
      translation: 'Оно не большое.',
      chips: ['nije', 'nisi']
    }
  },
  // Plural
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Mi {nismo} kod kuće.',
      translation: 'Мы не дома.',
      chips: ['nismo', 'nisi']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Vi {niste} umorni.',
      translation: 'Вы не устали.',
      chips: ['niste', 'nismo']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Oni {nisu} srećni.',
      translation: 'Они не счастливы.',
      chips: ['nisu', 'nisi']
    }
  },

  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'One {nisu} spremne.',
      translation: 'Они не готовы.',
      chips: ['nisu', 'niste']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Ona {nisu} ovde.',
      translation: 'Они не здесь.',
      chips: ['nisu', 'nisam']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Maria {nije} moj drug. Maria {je} moja drugarica.',
      translation: 'Мария не мой приятель. Мария моя приятельница.',
      chips: ['nije', 'je']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'Vi {niste} drugarice.',
      translation: 'Вы не приятельницы.',
      chips: ['niste', 'nisu']
    }
  },
  {
    type: ChallengeType.INSERT_CHIPS,
    data: {
      sentence: 'One {nisu} prijateljnice.',
      translation: 'Они не подруги.',
      chips: ['nisu', 'nismo']
    }
  }
];

export const challenges: ChallengeDescription[] = [
  ...combinedChallenges,
];