import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { listLessons, SectionDescription } from '@api/lessons';
import { Spinner } from '@components/ui/Spinner';
import { PathUnit } from '@components/LessonPath/PathUnit';

const Page = styled.div`
    max-width: 52rem;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
`;

const CenteredSpinner = styled(Spinner)`
    display: block;
    margin: 3rem auto;
`;

/**
 * The unit the learner is working on: the first one holding a lesson that is
 * unlocked but unfinished. Falls back to the first unit once everything is
 * complete, so the path never opens fully collapsed.
 */
function findCurrentUnit(sections: SectionDescription[]) {
    const index = sections.findIndex((section) =>
        section.lessons.some(
            (lesson) => !lesson.locked && lesson.progress < 100,
        ),
    );

    return index === -1 ? 0 : index;
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

    const currentUnit = findCurrentUnit(sections);

    return (
        <Page>
            {sections.map((section, index) => {
                const nextSection = sections[index + 1];

                return (
                    <PathUnit
                        key={section.name}
                        index={index + 1}
                        title={section.displayName}
                        lessons={section.lessons}
                        nextUnit={
                            nextSection && {
                                title: nextSection.displayName,
                                lessonCount: nextSection.lessons.length,
                            }
                        }
                        defaultOpen={index === currentUnit}
                    />
                );
            })}
        </Page>
    );
};
