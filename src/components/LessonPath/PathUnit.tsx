import { useState } from 'react';
import { styled } from 'styled-components';
import { Collapsible } from 'radix-ui';
import { ChevronDown } from 'lucide-react';

import { IconButton } from '@components/ui/IconButton';
import { UnstyledList } from '@components/Navigation/UnstyledList';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { LessonListItem } from '@api/lessons';

import { CompactLesson } from '@components/LessonPath/CompactLesson';
import { NextUnitCard, PathEnd } from '@components/LessonPath/NextUnitCard';
import { PathLesson } from '@components/LessonPath/PathLesson';
import { UnitBanner } from '@components/LessonPath/UnitBanner';
import { LessonPathState } from '@components/LessonPath/types';

export interface NextUnit {
    title: string;
    lessonCount: number;
}

export interface PathUnitProps {
    /** Position of the unit on the path, counted from 1. */
    index: number;
    title: string;
    lessons: LessonListItem[];
    /** Teased at the end of the unit; omit for the last one. */
    nextUnit?: NextUnit;
    /** Units the learner is not working on start collapsed. */
    defaultOpen?: boolean;
    className?: string;
}

const Unit = styled.section`
    & + & {
        margin-top: 2.5rem;
    }
`;

const Toggle = styled(IconButton)`
    flex-shrink: 0;

    svg {
        transition: transform ${({ theme }) => theme.transition.fast};
    }

    &[data-state='open'] svg {
        transform: rotate(180deg);
    }
`;

const Milestones = styled.ol`
    /* Style resets */
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Milestone = styled.li`
    min-width: 0;
`;

const Summary = styled(UnstyledList)`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;

    margin-top: 0.75rem;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
`;

const Outro = styled.div`
    margin-top: 0.75rem;
`;

function isCompleted(lesson: LessonListItem) {
    return lesson.progress >= 100;
}

/**
 * A lesson is `active` when it is the one the learner should open next. The
 * unlock rule already guarantees there is at most one such lesson per unit:
 * everything after the first unfinished lesson is locked.
 */
function getLessonState(lesson: LessonListItem): LessonPathState {
    if (lesson.locked) {
        return 'locked';
    }

    return isCompleted(lesson) ? 'completed' : 'active';
}

/**
 * One unit of the path. Expanded it shows the full milestone cards; collapsed
 * it falls back to a dense list, so a long path stays scannable.
 */
export const PathUnit = ({
    index,
    title,
    lessons,
    nextUnit,
    defaultOpen = true,
    className,
}: PathUnitProps) => {
    const [open, setOpen] = useState(defaultOpen);

    const completed = lessons.filter(isCompleted).length;

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen} asChild>
            <Unit className={className}>
                <UnitBanner
                    index={index}
                    title={title}
                    completed={completed}
                    total={lessons.length}
                    trigger={
                        <Collapsible.Trigger asChild>
                            <Toggle
                                aria-label={translate(
                                    I18NLangs.RU,
                                    open
                                        ? 'lesson-path-unit-collapse'
                                        : 'lesson-path-unit-expand',
                                    { title },
                                )}
                            >
                                <ChevronDown size={22} aria-hidden="true" />
                            </Toggle>
                        </Collapsible.Trigger>
                    }
                />

                {!open && (
                    <Summary>
                        {lessons.map((lesson) => (
                            <li key={lesson.id}>
                                <CompactLesson
                                    state={getLessonState(lesson)}
                                    title={`${lesson.displayTopic} · ${lesson.displayName}`}
                                    topic={lesson.topic}
                                    to={`/lessons/${lesson.id}`}
                                    currentTries={lesson.currentTries}
                                    recommendedTries={lesson.recommendedTries}
                                />
                            </li>
                        ))}
                    </Summary>
                )}

                <Collapsible.Content>
                    <Milestones>
                        {lessons.map((lesson, lessonIndex) => (
                            <Milestone key={lesson.id}>
                                <PathLesson
                                    state={getLessonState(lesson)}
                                    index={lessonIndex + 1}
                                    unitIndex={index}
                                    title={`${lesson.displayTopic} · ${lesson.displayName}`}
                                    description={lesson.description}
                                    topic={lesson.topic}
                                    to={`/lessons/${lesson.id}`}
                                    currentTries={lesson.currentTries}
                                    recommendedTries={lesson.recommendedTries}
                                    connected={lessonIndex < lessons.length - 1}
                                />
                            </Milestone>
                        ))}
                    </Milestones>

                    <Outro>
                        {nextUnit ? (
                            <NextUnitCard
                                title={nextUnit.title}
                                lessonCount={nextUnit.lessonCount}
                            />
                        ) : (
                            <PathEnd />
                        )}
                    </Outro>
                </Collapsible.Content>
            </Unit>
        </Collapsible.Root>
    );
};
