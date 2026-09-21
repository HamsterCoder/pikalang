import { BookOpen, Timer, Shuffle } from 'lucide-react';
import { styled } from 'styled-components';

import mascotHappy from '@assets/mascot-happy.webp';
import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { formatDuration } from '@utils/formatDuration';

import { StarTally } from './StarTally';

export interface WordLessonResultsProps {
    /** New words read rather than skipped, a star each. */
    learnedStars: number;
    /** Pairs matched without a wrong guess first, a star each. */
    matchStars: number;
    /** How many words the set held. */
    wordCount: number;
    /** How long the matching round took, in ms. */
    timeMs: number;
    className?: string;
}

const Panel = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    padding: 1.75rem 1.25rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.subtle};
    text-align: center;
`;

/**
 * The pika with the trophy. It is the first thing on the screen because the
 * run is over and the tone of the screen is the reward; the tally underneath
 * is what says how well it actually went.
 */
const Mascot = styled.img`
    width: 100%;
    max-width: 11rem;
    height: auto;
    margin-bottom: -0.25rem;

    user-select: none;
`;

const Rows = styled.dl`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    width: 100%;
    margin: 0;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    padding: 0.7rem 0.9rem;
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surfaceSunken};
    text-align: left;
`;

const RowIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 2rem;
    height: 2rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme }) => theme.color.accent};
    background-color: ${({ theme }) => theme.color.accentSoft};
`;

const RowLabel = styled.dt`
    flex: 1 1 auto;
    min-width: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    color: ${({ theme }) => theme.color.text};
`;

const RowValue = styled.dd`
    flex-shrink: 0;
    margin: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.color.heading};
`;

/**
 * What the set was worth: a star for every new word read and every pair
 * matched first time, and the clock the learner has to beat next round.
 */
export const WordLessonResults = ({
    learnedStars,
    matchStars,
    wordCount,
    timeMs,
    className,
}: WordLessonResultsProps) => {
    return (
        <Panel className={className}>
            <Mascot
                src={mascotHappy}
                alt={translate(I18NLangs.RU, 'word-complete-mascot-alt')}
                draggable={false}
            />

            <Heading size="m" color="default">
                <I18N textKey="word-complete-appraisal" lang={I18NLangs.RU} />
            </Heading>

            <StarTally
                earned={learnedStars + matchStars}
                total={wordCount * 2}
                size="large"
            />

            <Rows>
                <Row>
                    <RowIcon>
                        <BookOpen size={16} aria-hidden="true" />
                    </RowIcon>
                    <RowLabel>
                        <I18N
                            textKey="word-result-learned"
                            lang={I18NLangs.RU}
                        />
                    </RowLabel>
                    <RowValue>
                        {learnedStars} / {wordCount}
                    </RowValue>
                </Row>

                <Row>
                    <RowIcon>
                        <Shuffle size={16} aria-hidden="true" />
                    </RowIcon>
                    <RowLabel>
                        <I18N
                            textKey="word-result-matched"
                            lang={I18NLangs.RU}
                        />
                    </RowLabel>
                    <RowValue>
                        {matchStars} / {wordCount}
                    </RowValue>
                </Row>

                <Row>
                    <RowIcon>
                        <Timer size={16} aria-hidden="true" />
                    </RowIcon>
                    <RowLabel>
                        <I18N textKey="word-result-time" lang={I18NLangs.RU} />
                    </RowLabel>
                    <RowValue>{formatDuration(timeMs)}</RowValue>
                </Row>
            </Rows>
        </Panel>
    );
};
