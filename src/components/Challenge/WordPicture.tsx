import { FunctionComponent, useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from 'styled-components';

import { ChallengeType } from './types';
import { Picture } from '@components/Picture/Picture';
import { CheckAnswerControl } from '@components/CheckAnswerControl/CheckAnswerControl';
import { I18N, I18NLangs } from '@components/I18N/I18N';

export interface WordPictureData {
    images: string[];
    word: string;
    answer: string;
}

export interface WordPictureChallenge {
    type: ChallengeType.WORD_PICTURE;
    data: WordPictureData;
}

export interface WordPictureProps {
    challenge: WordPictureChallenge;
    onComplete({ solved }: { solved: boolean }): void;
}

const ImageGrid = styled.div`
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: fit-content(0px) fit-content(0px) fit-content(0px);

    margin-bottom: 20px;
`;

export const WordPicture: FunctionComponent<WordPictureProps> = ({
    challenge: { data },
    onComplete,
}) => {
    const [complete, setComplete] = useState(false);
    const [answerImage, setAnswerImage] = useState<string | null>(null);

    const checkAnswer = useCallback(
        function () {
            return data.answer === answerImage;
        },
        [data, answerImage],
    );

    function handleChallengeComplete({ solved }: { solved: boolean }): void {
        setComplete(true);
        onComplete({ solved });
    }

    function handleImageSelect(image: string): void {
        if (complete) {
            return;
        }

        setAnswerImage(image);
    }

    const expectedAnswer = data.answer;

    return (
        <div>
            <Typography variant="heading_m" color="primary" gutterBottom>
                <I18N textKey="word-picture-prompt" lang={I18NLangs.RU} />
            </Typography>

            <Typography mb={2} variant="heading_m">
                {data.word}
            </Typography>

            <ImageGrid>
                {data.images.map((image) => (
                    <Picture
                        key={image}
                        selected={answerImage === image}
                        image={image}
                        onSelect={handleImageSelect}
                    />
                ))}
            </ImageGrid>

            <CheckAnswerControl
                disabled={answerImage === null}
                onSubmit={handleChallengeComplete}
                checkAnswer={checkAnswer}
                expectedAnswer={expectedAnswer}
            />
        </div>
    );
};
