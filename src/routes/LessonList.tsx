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

import { listLessons } from '@api/lessons';
import { CardListItem, CardList } from '@components/CardList';
import { I18N, I18NLangs } from '@components/I18N/I18N';
import { EllipsisTypography } from '@components/EllispsisTypography';
import { Text } from '@components/Text/Text';

const Item = styled(Link)`
    display: block;
    height: 100%;
    text-decoration: none;
`;

// TODO: use React Query to fetch data
// https://tanstack.com/query/latest/docs/framework/react/overviews
// TODO: create an asynchrnous api to fetch lesson data, much like fetching conversations
// TODO: create a config to match lessons with sections
// TODO: create layout for sections in lesson list
// TODO: scroll to current active lesson on mobile and current active section on desktop

export const LessonList = () => {
    // TODO Load lesson data from the server
    // Including sections, lesson descriptions, and user progress
    const {
        isPending,
        error,
        data: lessons,
    } = useQuery({
        queryKey: ['listLessons', 'default'],
        queryFn: () => listLessons('default'),
    });

    if (error) {
        return 'An error has occurred: ' + error.message;
    }

    return (
        <CardList>
            {isPending && (
                <CircularProgress
                    sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
            )}
            {!isPending &&
                lessons.map((lesson) => (
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
                                    <EllipsisTypography
                                        variant="heading_s"
                                        gutterBottom
                                    >
                                        {lesson.displayTopic} &middot;{' '}
                                        {lesson.displayName}
                                    </EllipsisTypography>
                                    <LinearProgress
                                        variant="determinate"
                                        sx={{ marginBottom: 2 }}
                                        value={lesson.progress}
                                    ></LinearProgress>
                                    <Text
                                        type="primary"
                                        color="default"
                                        withMargin={false}
                                    >
                                        {lesson.description}
                                    </Text>
                                </CardContent>
                                <CardActions sx={{ flexShrink: 0 }}>
                                    <Button
                                        size="small"
                                        data-lesson-id={lesson.id}
                                    >
                                        <I18N
                                            textKey="lesson-list-practice-button"
                                            lang={I18NLangs.RU}
                                        ></I18N>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Item>
                    </CardListItem>
                ))}
        </CardList>
    );
};
