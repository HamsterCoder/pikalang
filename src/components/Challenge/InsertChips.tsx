import { Chip } from '@mui/material';
import { FunctionComponent, useState, useCallback, ReactNode } from 'react';
import { styled } from 'styled-components';

import { ChallengeType } from './types';
import { CheckAnswerControl } from '@components/CheckAnswerControl/CheckAnswerControl';
import { I18N, I18NLangs } from '@components/I18N/I18N';
import { Chips } from '@components/Chips/Chips';
import { shuffle } from '@utils/shuffle';
import { Heading } from '@components/Heading';

export interface InsertChipsData {
    sentence: string;
    translation: string;
    chips: string[];
}

export interface InsertChipsChallenge {
    type: ChallengeType.INSERT_CHIPS;
    data: InsertChipsData;
}

export interface TranslateChipsProps {
    challenge: InsertChipsChallenge;
    onComplete({ solved }: { solved: boolean }): void;
}

interface WordInsertProps {
    len: number;
}

const WordInsert = styled.span<WordInsertProps>`
    display: inline-block;
    min-width: ${(props) => (props.len - 2) * 0.8125}rem;
    border-bottom: 2px solid var(--primary-accent);
`;

function countMissingWords(sentence: string) {
    let wordCount = 0;

    for (const char of sentence) {
        if (char === '{') {
            wordCount += 1;
        }
    }
    return wordCount;
}

function getMissingWordsAndFragments(sentence: string) {
    const missingWords = [];
    const fragments = [];

    let readingWord = false;
    let currentWord = '';
    let currentFragment = '';

    for (const char of sentence) {
        if (readingWord) {
            if (char === '}') {
                missingWords.push(currentWord);
                currentWord = '';
                readingWord = false;
            } else {
                currentWord += char;
            }
        } else {
            if (char === '{') {
                fragments.push(currentFragment);
                currentFragment = '';
                readingWord = true;
            } else {
                currentFragment += char;
            }
        }
    }

    fragments.push(currentFragment);

    return {
        missingWords,
        fragments,
    };
}

function computeAnswer(sentence: string) {
    return sentence.replace(/{|}/g, '');
}

function plausibleAnswerSelected(
    answerChips: string[],
    missingWordsCount: number,
): boolean {
    return (
        answerChips.filter((chip) => chip !== '').length === missingWordsCount
    );
}

export const InsertChips: FunctionComponent<TranslateChipsProps> = ({
    challenge: { data },
    onComplete,
}) => {
    const [complete, setComplete] = useState(false);
    const [fromChips, setFromChips] = useState<string[]>(
        shuffle(data.chips.slice()),
    );
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    // Count the number of missing words
    const missingWordsCount: number = countMissingWords(data.sentence);

    const checkAnswer = useCallback(() => {
        console.log(
            `LOG::Answer chips: ${answerChips} and chips: ${data.chips}`,
        );

        const { missingWords } = getMissingWordsAndFragments(data.sentence);

        for (let i = 0; i < missingWords.length; i += 1) {
            if (answerChips[i] !== missingWords[i]) {
                return false;
            }
        }

        return true;
    }, [data, answerChips]);

    function handleChallengeComplete({ solved }: { solved: boolean }): void {
        setComplete(true);
        onComplete({ solved });
    }

    function onChipSelect(chip: string, index: number) {
        if (complete) {
            return;
        }

        // Find the first empty slot
        const insertIndex = answerChips.indexOf('');

        // Check that not all words have been inserted
        if (insertIndex === -1 && answerChips.length === missingWordsCount) {
            return;
        }

        setAnswerChips(
            insertIndex !== -1
                ? [
                      ...answerChips.slice(0, insertIndex),
                      chip,
                      ...answerChips.slice(insertIndex + 1),
                  ]
                : [...answerChips, chip],
        );

        setFromChips([
            ...fromChips.slice(0, index),
            ...fromChips.slice(index + 1),
        ]);
    }

    function onChipDeselect(chip: string, index: number) {
        if (complete) {
            return;
        }

        setFromChips([...fromChips, chip]);

        // Leave an empty slot
        setAnswerChips([
            ...answerChips.slice(0, index),
            '',
            ...answerChips.slice(index + 1),
        ]);
    }

    function prepareSentence(
        sentence: string,
        answerChips: string[],
    ): ReactNode[] {
        let insertCounter = 0;

        let readingWord = false;
        let currentWord = '';
        let currentFragment = '';
        const formattedSentence = [];

        for (const char of sentence) {
            if (readingWord) {
                if (char === '}') {
                    const chip = answerChips[insertCounter] && (
                        <Chip
                            sx={{ marginBottom: '5px' }}
                            variant="outlined"
                            onClick={onChipDeselect.bind(
                                null,
                                answerChips[insertCounter],
                                insertCounter,
                            )}
                            color="primary"
                            label={answerChips[insertCounter]}
                        />
                    );
                    formattedSentence.push(
                        <>
                            <WordInsert len={currentWord.length}>
                                {chip}
                            </WordInsert>{' '}
                        </>,
                    );
                    currentWord = '';
                    readingWord = false;
                    insertCounter += 1;
                } else {
                    currentWord += char;
                }
            } else {
                if (char === '{') {
                    formattedSentence.push(currentFragment);
                    currentFragment = '';
                    readingWord = true;
                } else {
                    currentFragment += char;
                }
            }
        }

        formattedSentence.push(currentFragment);

        return formattedSentence;
    }

    const expectedAnswer = computeAnswer(data.sentence);

    return (
        <div>
            <Heading size="m" color="default" sx={{ marginBottom: '1rem' }}>
                <I18N textKey="insert-chips-prompt" lang={I18NLangs.RU} />
            </Heading>

            <Heading size="s" color="default" sx={{ marginBottom: '1rem' }}>
                {prepareSentence(data.sentence, answerChips)}
            </Heading>

            <Chips chips={fromChips} onSelect={onChipSelect} />

            <CheckAnswerControl
                disabled={
                    !plausibleAnswerSelected(answerChips, missingWordsCount)
                }
                onSubmit={handleChallengeComplete}
                checkAnswer={checkAnswer}
                expectedAnswer={expectedAnswer}
                translation={data.translation}
            />
        </div>
    );
};
