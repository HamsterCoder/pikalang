// Show a grid of lessons - for alpha version keep it in a json
// For each lesson show how many times it was attempted - store this information in local storage?
// Each lesson should have a uniqueID

import { FunctionComponent } from "react";
import { styled } from "styled-components";
import { Button, Card, CardActions, CardContent, CardMedia, LinearProgress, Typography } from "@mui/material";
import { Header } from "../Header/Header";
import { LessonDescription } from "../Lesson/Lesson";

export interface LessonListProps {
    lessons: LessonDescription[];
    onLessonSelect(id: string): void;
}

const Container = styled.div`
    display: flex;
`;

const Item = styled.div`
    margin-left: 20px;
`;

export const LessonList: FunctionComponent<LessonListProps> = ({ lessons, onLessonSelect }) => {
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
            <Header></Header>
            <Container>
                {
                    lessons.map(lesson => <Item key={lesson.id}>
                        <Card sx={{ maxWidth: 200 }}>
                            <CardMedia
                                sx={{ height: 120 }}
                                image={`assets/${lesson.image}.jpg`}
                                title={lesson.name}
                            />
                            <CardContent>
                                <Typography variant="body1" gutterBottom>{lesson.topic} &gt; {lesson.name}</Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>{lesson.description}</Typography>
                                <LinearProgress variant="determinate" value={25}></LinearProgress>
                            </CardContent>
                            <CardActions>
                                <Button size="small" data-lesson-id={lesson.id} onClick={handleLessonSelect}>Practice</Button>
                            </CardActions>
                        </Card>
                    </Item>)
                }
            </Container>
        </div>
    );
};
