import { PictureOptions } from './PictureOptions';
import { SubjectCard } from './SubjectCard';

import type { WordPictureData } from '@components/Challenge/WordPicture';
import type { ChallengeViewProps } from './types';

export const WordPictureView = ({
    data,
    answer,
    locked,
    onAnswerChange,
}: ChallengeViewProps<WordPictureData>) => {
    return (
        <>
            <SubjectCard>{data.word}</SubjectCard>
            <PictureOptions
                images={data.images}
                selected={answer[0] ?? null}
                disabled={locked}
                onSelect={(image) => onAnswerChange([image])}
            />
        </>
    );
};
