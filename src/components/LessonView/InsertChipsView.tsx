import { Fragment, useMemo, useState } from 'react';
import { X as RemoveIcon } from 'lucide-react';
import { styled } from 'styled-components';

import { parseSentence } from '@components/Challenge/utils';
import { Chip } from '@components/ui/Chip';
import { shuffle } from '@utils/shuffle';

import { AnswerSlot } from './AnswerSlot.styles';
import { SubjectCard } from './SubjectCard';
import { WordBank } from './WordBank';

import type { InsertChipsData } from '@components/Challenge/InsertChips';
import type { ChallengeAnswer, ChallengeViewProps } from './types';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

/** The sentence reads as one line of text, blanks and all. */
const Sentence = styled.span`
    display: inline;
    line-height: 2.5;
`;

/** The first blank still waiting for a word, or -1 when the sentence is full. */
function firstEmptyBlank(answer: ChallengeAnswer, blanks: number): number {
    for (let index = 0; index < blanks; index += 1) {
        if (!answer[index]) {
            return index;
        }
    }

    return -1;
}

export const InsertChipsView = ({
    data,
    answer,
    locked,
    onAnswerChange,
}: ChallengeViewProps<InsertChipsData>) => {
    const { missingWords, fragments } = useMemo(
        () => parseSentence(data.sentence),
        [data.sentence],
    );
    const chips = useMemo(() => shuffle(data.chips.slice()), [data.chips]);

    /** Which bank word landed in which blank, so removal can give it back. */
    const [sources, setSources] = useState<Record<number, number>>({});

    function fill(word: string, bankIndex: number) {
        const blank = firstEmptyBlank(answer, missingWords.length);

        if (locked || blank === -1) {
            return;
        }

        const filled = [...answer];
        // Blanks are filled out of order, so pad rather than push.
        while (filled.length <= blank) {
            filled.push('');
        }
        filled[blank] = word;

        setSources({ ...sources, [blank]: bankIndex });
        onAnswerChange(filled);
    }

    function clear(blank: number) {
        if (locked || !answer[blank]) {
            return;
        }

        const emptied = [...answer];
        emptied[blank] = '';

        const remaining = { ...sources };
        delete remaining[blank];

        setSources(remaining);
        onAnswerChange(emptied);
    }

    function reset() {
        if (locked) {
            return;
        }

        setSources({});
        onAnswerChange([]);
    }

    return (
        <Layout>
            {/* The translation stays hidden until the answer is checked. */}
            <SubjectCard>
                <Sentence>
                    {fragments.map((fragment, index) => (
                        <Fragment key={index}>
                            {fragment}
                            {index < missingWords.length &&
                                (answer[index] ? (
                                    <Chip
                                        variant="solid"
                                        label={answer[index]}
                                        disabled={locked}
                                        onClick={() => clear(index)}
                                        trailing={
                                            <RemoveIcon
                                                size={14}
                                                aria-hidden="true"
                                            />
                                        }
                                    />
                                ) : (
                                    <AnswerSlot
                                        $length={missingWords[index].length}
                                        aria-hidden="true"
                                    />
                                ))}
                        </Fragment>
                    ))}
                </Sentence>
            </SubjectCard>
            <WordBank
                words={chips}
                usedIndices={Object.values(sources)}
                disabled={locked}
                onPick={fill}
                onReset={reset}
            />
        </Layout>
    );
};
