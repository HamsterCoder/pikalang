import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChallengeStage } from '@components/LessonView/ChallengeStage';
import { ChallengePrompt } from '@components/LessonView/ChallengePrompt';
import { SubjectCard } from '@components/LessonView/SubjectCard';
import { Button } from '@components/ui/Button';

const sentences = ['Кофе в чашке.', 'Это перец.', 'Я пью воду.'];

/**
 * Steps through a few screens the way the lesson does: the current one plays
 * out, and the next comes in under a new key.
 */
const Sequence = () => {
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);

    return (
        <div style={{ maxWidth: '40rem', display: 'grid', gap: '1.5rem' }}>
            <ChallengeStage
                key={index}
                leaving={leaving}
                onLeft={() => {
                    setLeaving(false);
                    setIndex((index + 1) % sentences.length);
                }}
            >
                <ChallengePrompt>Переведите предложение</ChallengePrompt>
                <SubjectCard>{sentences[index]}</SubjectCard>
            </ChallengeStage>

            <div>
                <Button disabled={leaving} onClick={() => setLeaving(true)}>
                    Дальше
                </Button>
            </div>
        </div>
    );
};

const meta = {
    title: 'LessonView/ChallengeStage',
    component: Sequence,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Sequence>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Press the button to move on; the screen slides out left and the next slides in. */
export const MovingOn: Story = {};
