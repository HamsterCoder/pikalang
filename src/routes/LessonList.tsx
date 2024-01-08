import { FunctionComponent, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    LinearProgress,
    Typography,
} from '@mui/material';

import { UserData, userDataApi } from '@api/user-data';
import { getLessonsDescriptions } from '@api/lessons';
import { CardListItem, CardList } from '@components/CardList';
import { I18N, I18NLangs } from '@components/I18N/I18N';
import { EllipsisTypography } from '@components/EllispsisTypography';

const Item = styled(Link)`
    display: block;
    height: 100%;
    text-decoration: none;
`;

function computeLessonProgress(
    userData: UserData | undefined,
    lessonId: string,
) {
    const lessonStats = userData?.lessons[lessonId];

    return lessonStats
        ? Math.min((lessonStats.completed / lessonStats.threshold) * 100, 100)
        : 0;
}

const lessons = getLessonsDescriptions();

export const LessonList: FunctionComponent = () => {
    const [loadingState, setLoadingState] = useState<string>('loading');
    const [userData, setUserData] = useState<UserData>();

    useEffect(() => {
        console.log('LOG::LessonList.effect run');

        userDataApi
            .getUserData('default')
            .then((userData) => {
                setUserData(userData);
                setLoadingState('complete');
            })
            .catch((error) => {
                console.log('LOG::LessonList.effect failed to fetch', error);
            });

        return () => {
            console.log('LOG::LessonList.effect clean');
        };
    }, [setLoadingState, setUserData]);

    return (
        <CardList>
            {loadingState === 'loading' && (
                <CircularProgress
                    sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
            )}
            {loadingState === 'complete' &&
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
                                        value={computeLessonProgress(
                                            userData,
                                            lesson.id,
                                        )}
                                    ></LinearProgress>
                                    <Typography variant="text_primary">
                                        {lesson.description}
                                    </Typography>
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
