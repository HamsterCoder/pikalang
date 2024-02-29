import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    LinearProgress,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { listLessons, LessonListItem } from '@api/lessons';
import { CardListItem, CardList } from '@components/CardList';
import { I18N, I18NLangs } from '@components/I18N/I18N';
import { EllipsisTypography } from '@components/EllispsisTypography';
import { Text } from '@components/Text/Text';
import { Heading } from '@components/Heading';

const Item = styled(Link)`
    display: block;
    height: 100%;
    text-decoration: none;
`;

// TODO: scroll to current active lesson on mobile and current active section on desktop

function renderLessonList(lessons: LessonListItem[]) {
    return lessons.map((lesson) => (
        <CardListItem key={lesson.id}>
            <Item to={`/lessons/${lesson.id}`}>
                <Card
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <EllipsisTypography variant="heading_s" gutterBottom>
                            {lesson.displayTopic} &middot; {lesson.displayName}
                        </EllipsisTypography>
                        <LinearProgress
                            variant="determinate"
                            sx={{ marginBottom: 2 }}
                            value={lesson.progress}
                        ></LinearProgress>
                        <Text type="primary" color="default" withMargin={false}>
                            {lesson.description}
                        </Text>
                    </CardContent>
                    <CardActions sx={{ flexShrink: 0 }}>
                        <Button size="small" data-lesson-id={lesson.id}>
                            <I18N
                                textKey="lesson-list-practice-button"
                                lang={I18NLangs.RU}
                            ></I18N>
                        </Button>
                    </CardActions>
                </Card>
            </Item>
        </CardListItem>
    ));
}

const LessonListHeading = styled(Heading)`
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
        <SectionContainer>
            <LessonListHeading size="m">
                {section.displayName}
            </LessonListHeading>
            <CardList>{renderLessonList(section.lessons)}</CardList>
        </SectionContainer>
    ));
};
