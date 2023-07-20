import { Typography, Button, Alert } from "@mui/material";
import { FunctionComponent, useState } from "react";

// TODO get rid of relative import for components
import {ChallengeType, ChallengeStatus} from "./Challenge";
import { styled } from "styled-components";
import { Picture } from "../Picture/Picture";

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
    const [status, setStatus] = useState<ChallengeStatus>(ChallengeStatus.PROGRESS);
    const [answerImage, setAnswerImage] = useState<string | null>(null);

    function onSubmit() {
        if (data.answer === answerImage) {
            setStatus(ChallengeStatus.CORRECT);
            onComplete({ solved: true });
        } else {
            setStatus(ChallengeStatus.INCORRECT);
            onComplete({ solved: false });
        }

        console.log(`Answer is ${data.answer === answerImage ? 'correct' : 'incorrect'}`);
    }

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>Choose the correct image</Typography>

            <Typography mb={2} variant="h5">{data.word}</Typography>

            <ImageGrid>
                {data.images.map(image => <Picture key={image} selected={answerImage === image} image={image} onSelect={setAnswerImage} />)}
            </ImageGrid>

            {/* // TODO Move submit to a separage component */}

            <div>
                {status === ChallengeStatus.PROGRESS && <Button color="success" variant="contained" sx={{ borderRadius: '8px' }} onClick={onSubmit}>Check</Button>}
                {status === ChallengeStatus.CORRECT && <Alert severity="success">The answer is correct</Alert>}
                {status === ChallengeStatus.INCORRECT && <Alert severity="error">
                    <Typography variant="body1">Incorrect. Expected answer: {data.answer}</Typography>
                </Alert>}
            </div>
        </div>
    );
};
