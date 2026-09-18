import { ReactNode } from 'react';
import { styled, css, keyframes } from 'styled-components';
import { Check, Lock, Play, RotateCcw, Zap } from 'lucide-react';

import { Badge } from '@components/ui/Badge';
import { ButtonLink } from '@components/ui/ButtonLink';
import { SegmentedProgress } from '@components/ui/SegmentedProgress';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text/Text';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';

import { LessonPathState } from '@components/LessonPath/types';
import { topicIcons } from '@components/LessonPath/topicIcons';

export interface PathLessonProps {
    state: LessonPathState;
    /** Position of the lesson inside its section, counted from 1. */
    index: number;
    /** Position of the section on the path, counted from 1. */
    unitIndex: number;
    title: string;
    description: string;
    /** Lesson topic, used to pick the milestone icon. */
    topic: string;
    /** Lesson route, e.g. `/lessons/food/vegetables-1`. */
    to: string;
    currentTries: number;
    recommendedTries: number;
    /** Draws the connector running down to the next milestone. */
    connected?: boolean;
    className?: string;
}

const glow = keyframes`
    0%, 100% { box-shadow: 0 0 0 0 rgba(155, 45, 127, 0.18); }
    50% { box-shadow: 0 0 0 8px rgba(155, 45, 127, 0); }
`;

/** The one lesson the learner is meant to open next gets a ring and a pulse. */
const activeCard = css`
    padding: calc(1.25rem - 1px);
    border: 2px solid ${({ theme }) => theme.color.accent};
    animation: ${glow} 2.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const Card = styled.div<{ $state: LessonPathState }>`
    display: flex;
    align-items: stretch;
    gap: 1rem;

    padding: 1.25rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme, $state }) =>
        $state === 'locked' ? theme.color.surfaceSunken : theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.subtle};

    transition:
        border-color ${({ theme }) => theme.transition.fast},
        box-shadow ${({ theme }) => theme.transition.fast};

    ${({ $state }) => $state === 'active' && activeCard}
`;

const Rail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
`;

const Milestone = styled.div<{ $state: LessonPathState }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 3rem;
    height: 3rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme, $state }) =>
        $state === 'locked' ? theme.color.hint : theme.color.textInverted};
    background-color: ${({ theme, $state }) => {
        if ($state === 'completed') {
            return theme.color.successHover;
        }

        return $state === 'active'
            ? theme.color.accent
            : theme.color.surfaceMuted;
    }};
    box-shadow: ${({ theme, $state }) =>
        $state === 'locked' ? 'none' : theme.shadow.subtle};
`;

const Connector = styled.div<{ $state: LessonPathState }>`
    flex: 1 1 auto;

    width: 2px;
    min-height: 1rem;
    margin-top: 0.5rem;
    border-radius: ${({ theme }) => theme.radius.pill};

    background-color: ${({ theme, $state }) =>
        $state === 'completed' ? theme.color.success : theme.color.border};
`;

const Body = styled.div`
    flex: 1 1 auto;
    min-width: 0;
`;

const Head = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
`;

const Info = styled.div`
    flex: 1 1 14rem;
    min-width: 0;
`;

const Labels = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    margin-bottom: 0.35rem;
`;

const Label = styled.span<{ $state: LessonPathState }>`
    font-size: ${({ theme }) => theme.text.chip.size};
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;

    color: ${({ theme, $state }) => {
        if ($state === 'completed') {
            return theme.color.successText;
        }

        return $state === 'active' ? theme.color.accent : theme.color.hint;
    }};
`;

const Description = styled(Text)`
    && {
        margin-top: 0.15rem;
        color: ${({ theme }) => theme.color.hint};
    }
`;

const LockedAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2.25rem;
    height: 2.25rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme }) => theme.color.hint};
    background-color: ${({ theme }) => theme.color.surfaceMuted};
`;

/** `margin-left: auto` keeps the action on the right once the head wraps. */
const Action = styled.div`
    flex: 0 0 auto;
    margin-left: auto;
`;

const Footer = styled.div`
    margin-top: 1rem;
`;

function renderAction(
    state: LessonPathState,
    to: string,
    title: string,
    started: boolean,
): ReactNode {
    if (state === 'locked') {
        return (
            <LockedAction
                aria-label={translate(I18NLangs.RU, 'lesson-path-state-locked')}
            >
                <Lock size={18} aria-hidden="true" />
            </LockedAction>
        );
    }

    const actionKey =
        state === 'completed'
            ? 'lesson-path-action-review'
            : started
              ? 'lesson-path-action-continue'
              : 'lesson-path-action-start';

    const ActionIcon = state === 'completed' ? RotateCcw : Play;

    return (
        <ButtonLink
            to={to}
            variant={state === 'completed' ? 'text' : 'filled'}
            aria-label={`${translate(I18NLangs.RU, actionKey)}: ${title}`}
        >
            <ActionIcon size={18} aria-hidden="true" />
            <I18N textKey={actionKey} lang={I18NLangs.RU} />
        </ButtonLink>
    );
}

/** One lesson as a milestone on the learning path. */
export const PathLesson = ({
    state,
    index,
    unitIndex,
    title,
    description,
    topic,
    to,
    currentTries,
    recommendedTries,
    connected = false,
    className,
}: PathLessonProps) => {
    const TopicIcon = topicIcons[topic] ?? topicIcons.default;
    const MilestoneIcon = state === 'completed' ? Check : TopicIcon;

    const badgeTone =
        state === 'completed'
            ? 'success'
            : state === 'active'
              ? 'accent'
              : 'muted';
    const BadgeIcon =
        state === 'completed' ? Check : state === 'active' ? Zap : Lock;

    return (
        <Card className={className} $state={state}>
            <Rail>
                <Milestone $state={state}>
                    <MilestoneIcon size={24} aria-hidden="true" />
                </Milestone>
                {connected && <Connector $state={state} />}
            </Rail>

            <Body>
                <Head>
                    <Info>
                        <Labels>
                            <Label $state={state}>
                                <I18N
                                    textKey="lesson-path-lesson-label"
                                    lang={I18NLangs.RU}
                                    values={{ unit: unitIndex, index }}
                                />
                            </Label>
                            <Badge
                                tone={badgeTone}
                                icon={<BadgeIcon size="0.9em" />}
                            >
                                <I18N
                                    textKey={`lesson-path-state-${state}`}
                                    lang={I18NLangs.RU}
                                />
                            </Badge>
                        </Labels>

                        <Heading
                            size="s"
                            color={
                                state === 'locked' ? 'currentColor' : 'default'
                            }
                        >
                            {title}
                        </Heading>
                        <Description type="secondary" withMargin={false}>
                            {description}
                        </Description>
                    </Info>

                    <Action>
                        {renderAction(state, to, title, currentTries > 0)}
                    </Action>
                </Head>

                <Footer>
                    <SegmentedProgress
                        total={recommendedTries}
                        completed={currentTries}
                        tone={
                            state === 'completed'
                                ? 'success'
                                : state === 'active'
                                  ? 'accent'
                                  : 'muted'
                        }
                        aria-label={translate(
                            I18NLangs.RU,
                            'lesson-path-steps-label',
                        )}
                        label={
                            <I18N
                                textKey={
                                    state === 'locked'
                                        ? 'lesson-path-steps-locked'
                                        : 'lesson-path-steps'
                                }
                                lang={I18NLangs.RU}
                                values={{
                                    completed: Math.min(
                                        currentTries,
                                        recommendedTries,
                                    ),
                                    total: recommendedTries,
                                }}
                            />
                        }
                    />
                </Footer>
            </Body>
        </Card>
    );
};
