import { styled, css } from 'styled-components';
import { Link } from 'react-router';
import { Check, Lock } from 'lucide-react';

import { SegmentedProgress } from '@components/ui/SegmentedProgress';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';

import { LessonPathState } from '@components/LessonPath/types';
import { topicIcons } from '@components/LessonPath/topicIcons';

export interface CompactLessonProps {
    state: LessonPathState;
    title: string;
    /** Lesson topic, used to pick the icon. */
    topic: string;
    /** Lesson route, e.g. `/lessons/food/vegetables-1`. */
    to: string;
    currentTries: number;
    recommendedTries: number;
    className?: string;
}

const rowStyles = css`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    padding: 0.5rem 0.75rem;
    border-radius: ${({ theme }) => theme.radius.m};

    color: ${({ theme }) => theme.color.text};
    text-decoration: none;
`;

const RowLink = styled(Link)<{ $state: LessonPathState }>`
    ${rowStyles}

    background-color: ${({ theme, $state }) =>
        $state === 'active' ? theme.color.accentWash : 'transparent'};
    transition: background-color ${({ theme }) => theme.transition.fast};

    &:hover {
        background-color: ${({ theme }) => theme.color.accentSoft};
    }
`;

const RowStatic = styled.div`
    ${rowStyles}

    color: ${({ theme }) => theme.color.hint};
`;

const Marker = styled.span<{ $state: LessonPathState }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 1.75rem;
    height: 1.75rem;
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
`;

const Title = styled.span<{ $state: LessonPathState }>`
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    font-weight: ${({ $state }) => ($state === 'active' ? 500 : 400)};
    color: ${({ theme, $state }) =>
        $state === 'active' ? theme.color.accent : 'inherit'};
`;

const Steps = styled(SegmentedProgress)`
    flex: 0 0 4.5rem;
`;

/**
 * One lesson as a single dense row, for a unit that is collapsed. Carries the
 * same three states as `PathLesson`, with progress but no description.
 */
export const CompactLesson = ({
    state,
    title,
    topic,
    to,
    currentTries,
    recommendedTries,
    className,
}: CompactLessonProps) => {
    const TopicIcon = topicIcons[topic] ?? topicIcons.default;
    const MarkerIcon =
        state === 'completed' ? Check : state === 'locked' ? Lock : TopicIcon;

    const content = (
        <>
            <Marker $state={state}>
                <MarkerIcon size={15} aria-hidden="true" />
            </Marker>
            <Title $state={state}>{title}</Title>
            <Steps
                total={recommendedTries}
                completed={currentTries}
                tone={
                    state === 'completed'
                        ? 'success'
                        : state === 'active'
                          ? 'accent'
                          : 'muted'
                }
                aria-label={translate(I18NLangs.RU, 'lesson-path-steps-label')}
            />
        </>
    );

    if (state === 'locked') {
        return (
            <RowStatic
                className={className}
                aria-label={`${title}: ${translate(
                    I18NLangs.RU,
                    'lesson-path-state-locked',
                )}`}
            >
                {content}
            </RowStatic>
        );
    }

    return (
        <RowLink className={className} to={to} $state={state}>
            {content}
        </RowLink>
    );
};
