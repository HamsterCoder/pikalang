import { FunctionComponent, useCallback, useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "styled-components";


import {ChallengeType} from "./types";
import { Picture } from "../Picture/Picture";
import { CheckAnswerControl } from "../CheckAnswerControl/CheckAnswerControl";

export interface WordPictureData {
    images: string[];
    word: string;
    answer: string;
}

export interface WordPictureProps {
    type: ChallengeType.WORD_PICTURE;
    data: WordPictureData;
    onComplete({solved}: {solved: boolean}): void;
}

const ImageGrid = styled.div`
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: fit-content(0px) fit-content(0px) fit-content(0px);

    margin-bottom: 20px;
`;

export const WordPicture: FunctionComponent<WordPictureProps> = ({ data, onComplete }) => {
    const [answerImage, setAnswerImage] = useState<string | null>(null);

    const checkAnswer = useCallback(function () {
        return data.answer === answerImage;
    }, [data, answerImage]);

    const expectedAnswer = data.answer;

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>Choose the correct image</Typography>

            <Typography mb={2} variant="h5">{data.word}</Typography>

            <ImageGrid>
                {data.images.map(image => <Picture key={image} selected={answerImage === image} image={image} onSelect={setAnswerImage} />)}
            </ImageGrid>

            <CheckAnswerControl onSubmit={onComplete} checkAnswer={checkAnswer} expectedAnswer={expectedAnswer} />
        </div>
    );
};
