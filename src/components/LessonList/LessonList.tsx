// Show a grid of lessons - for alpha version keep it in a json
// For each lesson show how many times it was attempted - store this information in local storage?
// Each lesson should have a uniqueID

import { FunctionComponent, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Button, Card, CardActions, CardContent, CircularProgress, LinearProgress, Typography } from "@mui/material";

import { Header } from "../Header/Header";
import { LessonDescription } from "../Lesson/Lesson";
import { UserData, userDataApi } from "../../api/user-data";

export interface LessonListProps {
    lessons: LessonDescription[];
    onLessonSelect(id: string): void;
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled.div`
    margin-left: 20px;
    margin-bottom: 20px;
`;

function computeLessonProgress(userData: UserData | undefined, lessonId: string) {
    const lessonStats = userData?.lessons[lessonId];

    return lessonStats ? Math.min(lessonStats.completed / lessonStats.threshold * 100, 100): 0;
}

export const LessonList: FunctionComponent<LessonListProps> = ({ lessons, onLessonSelect }) => {
    const [loadingState, setLoadingState] = useState<string>('loading');
    const [userData, setUserData] = useState<UserData>();

    useEffect(() => {
        console.log('LOG::LessonList.effect run');

        setUserData(userDataApi.getUserData('default'));
        setLoadingState('complete');

        return () => {
            console.log('LOG::LessonList.effect clean');
        };
    }, [setLoadingState, setUserData]);

    function handleLessonSelect(evt: React.MouseEvent<HTMLButtonElement>) {
        const lessonId = evt.currentTarget.getAttribute('data-lesson-id');

        if (typeof lessonId === 'string') {
            onLessonSelect(lessonId);
        } else {
            console.error('"data-lesson-id" attribute is missing');
        }
    }

    return (
        <div>
            <Header>
                <Typography variant="h4">Lessons</Typography>
            </Header>
            <Container>
                { loadingState === 'loading' && <CircularProgress sx={{marginLeft: 'auto',  marginRight: 'auto'}}/>}
                {
                    loadingState === 'complete' && lessons.map(lesson => <Item key={lesson.id}>
                        <Card sx={{ width: 200, minHeight: 180, display: 'flex', flexDirection: 'column' }}>
                            {/* <CardMedia
                                sx={{ height: 140, flexShrink: 0 }}
                                image={`assets/${lesson.image}.jpg`}
                                title={lesson.name}
                            /> */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="body1" gutterBottom>{lesson.topic} &middot; {lesson.name}</Typography>
                                <LinearProgress variant="determinate" sx={{ marginBottom: 2 }} value={computeLessonProgress(userData, lesson.id)}></LinearProgress>
                                <Typography variant="body2" color="text.secondary">{lesson.description}</Typography>
                            </CardContent>
                            <CardActions sx={{ flexShrink: 0 }}>
                                <Button size="small" data-lesson-id={lesson.id} onClick={handleLessonSelect}>Practice</Button>
                            </CardActions>
                        </Card>
                    </Item>)
                }
            </Container>
        </div>
    );
};
