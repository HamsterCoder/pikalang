import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { listLessons, LessonListItem, SectionDescription } from '@api/lessons';
import { Spinner } from '@components/ui/Spinner';
import { PathLesson } from '@components/LessonPath/PathLesson';
import { NextUnitCard, PathEnd } from '@components/LessonPath/NextUnitCard';
import { UnitBanner } from '@components/LessonPath/UnitBanner';
import { LessonPathState } from '@components/LessonPath/types';

const Page = styled.div`
    max-width: 52rem;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
`;

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

const Outro = styled.div`
    margin-top: 0.75rem;
`;

const CenteredSpinner = styled(Spinner)`
    display: block;
    margin: 3rem auto;
`;

function isCompleted(lesson: LessonListItem) {
    return lesson.progress >= 100;
}

/**
 * A lesson is `active` when it is the one the learner should open next. The
 * unlock rule already guarantees there is at most one such lesson per section:
 * everything after the first unfinished lesson is locked.
 */
function getLessonState(lesson: LessonListItem): LessonPathState {
    if (lesson.locked) {
        return 'locked';
    }

    return isCompleted(lesson) ? 'completed' : 'active';
}

function renderUnit(
    section: SectionDescription,
    unitIndex: number,
    nextSection?: SectionDescription,
) {
    const completed = section.lessons.filter(isCompleted).length;

    return (
        <Unit key={section.name}>
            <UnitBanner
                index={unitIndex}
                title={section.displayName}
                completed={completed}
                total={section.lessons.length}
            />

            <Milestones>
                {section.lessons.map((lesson, index) => (
                    <Milestone key={lesson.id}>
                        <PathLesson
                            state={getLessonState(lesson)}
                            index={index + 1}
                            unitIndex={unitIndex}
                            title={`${lesson.displayTopic} · ${lesson.displayName}`}
                            description={lesson.description}
                            topic={lesson.topic}
                            to={`/lessons/${lesson.id}`}
                            currentTries={lesson.currentTries}
                            recommendedTries={lesson.recommendedTries}
                            connected={index < section.lessons.length - 1}
                        />
                    </Milestone>
                ))}
            </Milestones>

            <Outro>
                {nextSection ? (
                    <NextUnitCard
                        title={nextSection.displayName}
                        lessonCount={nextSection.lessons.length}
                    />
                ) : (
                    <PathEnd />
                )}
            </Outro>
        </Unit>
    );
}

/**
 * The learning path: the same lessons as `LessonList`, laid out as a vertical
 * roadmap of units instead of a grid of cards.
 */
export const LessonPath = () => {
    const {
        isPending,
        error,
        data: sections,
    } = useQuery({
        queryKey: ['listLessons', 'default'],
        queryFn: () => listLessons('default'),
    });

    if (error) {
        return 'An error has occurred: ' + error.message;
    }

    if (isPending) {
        return <CenteredSpinner />;
    }

    return (
        <Page>
            {sections.map((section, index) =>
                renderUnit(section, index + 1, sections[index + 1]),
            )}
        </Page>
    );
};
