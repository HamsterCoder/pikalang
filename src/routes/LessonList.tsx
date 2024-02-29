import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgress, LinearProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { listLessons, LessonListItem } from '@api/lessons';
import { CardListItem, CardList } from '@components/CardList';
import { EllipsisTypography } from '@components/EllispsisTypography';
import { Text } from '@components/Text/Text';
import { Heading } from '@components/Heading';

// TODO: scroll to current active lesson on mobile and current active section on desktop

const LessonProgress = styled(LinearProgress)`
    && {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        height: 0.5rem;
    }
`;

const CardLink = styled(Link)`
    display: block;
    height: 100%;
    text-decoration: none;
`;

const CustomCard = styled.div`
    position: relative;

    width: 100%;
    height: 100%;
    padding: 1rem;
    padding-bottom: 1.5rem;

    display: flex;
    flex-direction: column;

    box-shadow:
        0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    border-radius: 0.25rem;
    background-color: rgba(217, 175, 207, 0.2);

    overflow: hidden;
`;

function renderLessonList(lessons: LessonListItem[]) {
    return lessons.map((lesson) => (
        <CardListItem key={lesson.id}>
            <CardLink to={`/lessons/${lesson.id}`}>
                <CustomCard>
                    <EllipsisTypography variant="heading_s" gutterBottom>
                        {lesson.displayTopic} &middot; {lesson.displayName}
                    </EllipsisTypography>
                    <Text type="primary" color="default" withMargin={false}>
                        {lesson.description}
                    </Text>
                    <LessonProgress
                        variant="determinate"
                        value={lesson.progress}
                    ></LessonProgress>
                </CustomCard>
            </CardLink>
        </CardListItem>
    ));
}

const SectionHeading = styled(Heading)`
    && {
        margin-bottom: 1rem;
        padding: 0 2rem;
    }
`;

const SectionContainer = styled.div`
    margin-bottom: 1rem;
`;

export const LessonList = () => {
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
        return (
            <CircularProgress
                sx={{ marginLeft: 'auto', marginRight: 'auto' }}
            />
        );
    }

    return sections.map((section) => (
        <SectionContainer key={section.name}>
            <SectionHeading size="m">{section.displayName}</SectionHeading>
            <CardList>{renderLessonList(section.lessons)}</CardList>
        </SectionContainer>
    ));
};
