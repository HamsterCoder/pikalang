import { ArrowRight } from 'lucide-react';
import { styled } from 'styled-components';

import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { Button } from '@components/ui/Button';
import { ButtonLink } from '@components/ui/ButtonLink';
import { LessonRow } from '@components/LessonView/LessonView.styles';

import type { WordLessonLifecycle } from './wordLessonState';

export interface WordLessonFooterProps {
    /** Which stage of the set the footer is closing off. */
    lifecycle: WordLessonLifecycle;
    /** Pairs still on the board, for the hint shown during the round. */
    pairsLeft?: number;
    /** Where the result screen sends the learner back to. */
    topicsTo?: string;
    onKnown(): void;
    onContinue(): void;
}

const Bar = styled.footer`
    position: sticky;
    bottom: 0;
    z-index: 5;

    border-top: 1px solid ${({ theme }) => theme.color.border};
    background-color: ${({ theme }) => theme.color.surface};
`;

const Actions = styled(LessonRow)`
    justify-content: space-between;
    padding-block: 0.75rem;
`;

/** Holds the right-hand action against the column edge when there is no left one. */
const Spacer = styled.span``;

const Hint = styled.p`
    margin: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    color: ${({ theme }) => theme.color.hint};
`;

/**
 * Everything the learner can do next. As in the lesson, which controls the bar
 * offers is the whole of what changes between a new word, the matching round
 * and the result.
 */
export const WordLessonFooter = ({
    lifecycle,
    pairsLeft = 0,
    topicsTo = '/words/',
    onKnown,
    onContinue,
}: WordLessonFooterProps) => {
    return (
        <Bar>
            <Actions>
                {lifecycle === 'word' && (
                    <>
                        <Button variant="text" onClick={onKnown}>
                            <I18N
                                textKey="word-known-button"
                                lang={I18NLangs.RU}
                            />
                        </Button>
                        <Button tone="success" onClick={onContinue}>
                            <I18N
                                textKey="word-continue-button"
                                lang={I18NLangs.RU}
                            />
                            <ArrowRight size={18} aria-hidden="true" />
                        </Button>
                    </>
                )}

                {lifecycle === 'match' && (
                    <Hint>
                        <I18N
                            textKey="word-match-remaining"
                            lang={I18NLangs.RU}
                            values={{ count: pairsLeft }}
                        />
                    </Hint>
                )}

                {lifecycle === 'complete' && (
                    <>
                        <Spacer />
                        <ButtonLink to={topicsTo} tone="success">
                            <I18N
                                textKey="word-complete-to-topics"
                                lang={I18NLangs.RU}
                            />
                        </ButtonLink>
                    </>
                )}
            </Actions>
        </Bar>
    );
};
