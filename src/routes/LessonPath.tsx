import { useContext } from 'react';
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import { listLessons } from '@api/lessons';
import { Spinner } from '@components/ui/Spinner';
import { PathUnit } from '@components/LessonPath/PathUnit';
import { EnvContext } from '@routes/EnvContext';

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
 * The learning path: the same lessons as `LessonList`, laid out as a vertical
 * roadmap of units instead of a grid of cards.
 */
export const LessonPath = () => {
    const { mobile } = useContext(EnvContext);

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
            {sections.map((section, index) => {
                const nextSection = sections[index + 1];

                return (
                    <PathUnit
                        key={section.name}
                        index={index + 1}
                        title={section.displayName}
                        lessons={section.lessons}
                        variant={mobile ? 'compact' : 'cards'}
                        nextUnit={
                            nextSection && {
                                title: nextSection.displayName,
                                lessonCount: nextSection.lessons.length,
                            }
                        }
                    />
                );
            })}
        </Page>
    );
};
