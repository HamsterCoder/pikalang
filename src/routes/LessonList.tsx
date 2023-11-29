import { FunctionComponent, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    LinearProgress,
    Typography,
} from '@mui/material';

import { I18N, I18NLangs } from '@components/I18N/I18N';
import { UserData, userDataApi } from '@api/user-data';
import { getLessonsDescriptions } from '@api/lessons';
import { Link } from 'react-router-dom';

const Item = styled(Link)`
    margin-left: 20px;
    margin-bottom: 20px;

    text-decoration: none;
`;

const EllipsisTypography = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
        <>
            {loadingState === 'loading' && (
                <CircularProgress
                    sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
            )}
            {loadingState === 'complete' &&
                lessons.map((lesson) => (
                    <Item key={lesson.id} to={`/lessons/${lesson.id}`}>
                        <Card
                            sx={{
                                width: 230,
                                minHeight: 180,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <EllipsisTypography
                                    variant="body1"
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
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {lesson.description}
                                </Typography>
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
                ))}
        </>
    );
};
