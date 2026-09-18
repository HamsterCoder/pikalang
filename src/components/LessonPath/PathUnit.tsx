import { styled } from 'styled-components';

import { UnstyledList } from '@components/ui/UnstyledList';
import { LessonListItem } from '@api/lessons';

import { CompactLesson } from '@components/LessonPath/CompactLesson';
import { NextUnitCard, PathEnd } from '@components/LessonPath/NextUnitCard';
import { PathLesson } from '@components/LessonPath/PathLesson';
import { UnitBanner } from '@components/LessonPath/UnitBanner';
import { LessonPathState } from '@components/LessonPath/types';

/**
 * How much of a lesson a unit shows.
 *
 * `cards` is the full milestone treatment; `compact` is one dense row per
 * lesson, which is what fits a phone.
 */
export type PathUnitVariant = 'cards' | 'compact';

export interface NextUnit {
    title: string;
    lessonCount: number;
}

export interface PathUnitProps {
    /** Position of the unit on the path, counted from 1. */
    index: number;
    title: string;
    lessons: LessonListItem[];
    variant?: PathUnitVariant;
    /** Teased at the end of the unit; omit for the last one. Cards only. */
    nextUnit?: NextUnit;
    className?: string;
}

const Unit = styled.section`
    & + & {
        margin-top: 2.5rem;
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

function lessonTitle(lesson: LessonListItem) {
    return `${lesson.displayTopic} · ${lesson.displayName}`;
}

/** One unit of the path: its banner plus its lessons. */
export const PathUnit = ({
    index,
    title,
    lessons,
    variant = 'cards',
    nextUnit,
    className,
}: PathUnitProps) => {
    const completed = lessons.filter(isCompleted).length;

    return (
        <Unit className={className}>
            <UnitBanner
                index={index}
                title={title}
                completed={completed}
                total={lessons.length}
            />

            {variant === 'compact' ? (
                <Summary>
                    {lessons.map((lesson) => (
                        <li key={lesson.id}>
                            <CompactLesson
                                state={getLessonState(lesson)}
                                title={lessonTitle(lesson)}
                                topic={lesson.topic}
                                to={`/lessons/${lesson.id}`}
                                currentTries={lesson.currentTries}
                                recommendedTries={lesson.recommendedTries}
                            />
                        </li>
                    ))}
                </Summary>
            ) : (
                <>
                    <Milestones>
                        {lessons.map((lesson, lessonIndex) => (
                            <Milestone key={lesson.id}>
                                <PathLesson
                                    state={getLessonState(lesson)}
                                    index={lessonIndex + 1}
                                    unitIndex={index}
                                    title={lessonTitle(lesson)}
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
                </>
            )}
        </Unit>
    );
};
