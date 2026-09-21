import { useState } from 'react';
import { styled } from 'styled-components';

import { AnswerStrip } from './AnswerStrip';
import { WordBank } from './WordBank';

import type { ChallengeAnswer } from './types';

export interface ChipsAnswerProps {
    /** The words on offer, in the order they are shown. */
    chips: string[];
    answer: ChallengeAnswer;
    expected: string;
    locked: boolean;
    onAnswerChange(answer: ChallengeAnswer): void;
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

/**
 * Composing an answer out of word chips: the strip shows what has been placed,
 * the bank what is left. The bank is addressed by index, so a sentence that
 * needs the same word twice still works.
 */
export const ChipsAnswer = ({
    chips,
    answer,
    expected,
    locked,
    onAnswerChange,
}: ChipsAnswerProps) => {
    const [pickedIndices, setPickedIndices] = useState<number[]>([]);

    function pick(word: string, index: number) {
        if (locked) {
            return;
        }

        setPickedIndices([...pickedIndices, index]);
        onAnswerChange([...answer, word]);
    }

    function remove(_word: string, position: number) {
        if (locked) {
            return;
        }

        setPickedIndices(pickedIndices.filter((_, i) => i !== position));
        onAnswerChange(answer.filter((_, i) => i !== position));
    }

    function reset() {
        if (locked) {
            return;
        }

        setPickedIndices([]);
        onAnswerChange([]);
    }

    return (
        <Layout>
            <AnswerStrip
                words={answer}
                expected={expected}
                disabled={locked}
                onRemove={remove}
            />
            <WordBank
                words={chips}
                usedIndices={pickedIndices}
                disabled={locked}
                onPick={pick}
                onReset={reset}
            />
        </Layout>
    );
};
