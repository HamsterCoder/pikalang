export function isCorrectAnswer(possibleAnswers: string[], answerChips: string[]) {
    return possibleAnswers.some(
        (possibleAnswer) =>
            possibleAnswer.toLowerCase() ===
            answerChips.join(' ').toLowerCase(),
    );
}

export function prepareAnotherAnswer(possibleAnswers: string[], answerChips: string[]): string|undefined {
    const answerIndex = possibleAnswers.findIndex(
        (possibleAnswer) => possibleAnswer.toLowerCase() ===
        answerChips.join(' ').toLowerCase(),
    );

    if (answerIndex !== -1) {
        if (possibleAnswers.length === 1) {
            return;
        }

        if (answerIndex !== possibleAnswers.length - 1) {
            return possibleAnswers[answerIndex + 1];
        } else {
            return possibleAnswers[0];
        }
    }

    return;
}

