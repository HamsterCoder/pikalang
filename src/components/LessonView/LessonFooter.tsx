import { styled } from 'styled-components';

import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { Button } from '@components/ui/Button';
import { ButtonLink } from '@components/ui/ButtonLink';

import { FeedbackDock } from './FeedbackDock';
import { LessonRow } from './LessonView.styles';

import type { LessonLifecycle } from './lessonState';
import type { ChallengeVerdict } from './types';

export interface LessonFooterProps {
    /** Which stage of the lesson the footer is closing off. */
    lifecycle: LessonLifecycle;
    /** Set once the answer is checked, which puts the verdict in the bar. */
    verdict: ChallengeVerdict | null;
    /** Whether there is enough of an answer to be worth checking. */
    canCheck: boolean;
    onStart(): void;
    onSkip(): void;
    onCheck(): void;
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

/**
 * Everything the learner can do next, in one bar at the foot of the lesson.
 * Which controls it offers is the whole of what changes between the help
 * screen, an unanswered challenge, a checked one and the results.
 */
export const LessonFooter = ({
    lifecycle,
    verdict,
    canCheck,
    onStart,
    onSkip,
    onCheck,
    onContinue,
}: LessonFooterProps) => {
    if (lifecycle === 'challenge' && verdict) {
        return (
            <Bar>
                <FeedbackDock verdict={verdict} onContinue={onContinue} />
            </Bar>
        );
    }

    return (
        <Bar>
            <Actions>
                {lifecycle === 'help' && (
                    <>
                        <Spacer />
                        <Button tone="success" onClick={onStart}>
                            <I18N
                                textKey="lesson-start-button"
                                lang={I18NLangs.RU}
                            />
                        </Button>
                    </>
                )}

                {lifecycle === 'challenge' && (
                    <>
                        <Button variant="text" onClick={onSkip}>
                            <I18N
                                textKey="lesson-skip-button"
                                lang={I18NLangs.RU}
                            />
                        </Button>
                        <Button
                            tone="success"
                            disabled={!canCheck}
                            onClick={onCheck}
                        >
                            <I18N
                                textKey="lesson-submit-button"
                                lang={I18NLangs.RU}
                            />
                        </Button>
                    </>
                )}

                {lifecycle === 'complete' && (
                    <>
                        <Spacer />
                        <ButtonLink to="/lessons/" tone="success">
                            <I18N
                                textKey="lesson-complete-to-lesson-list"
                                lang={I18NLangs.RU}
                            />
                        </ButtonLink>
                    </>
                )}
            </Actions>
        </Bar>
    );
};
