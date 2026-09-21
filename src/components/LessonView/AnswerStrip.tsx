import { X as RemoveIcon } from 'lucide-react';
import { styled } from 'styled-components';

import { Chip } from '@components/ui/Chip';

import { AnswerSlot } from './AnswerSlot.styles';

export interface AnswerStripProps {
    /** The words placed so far, in order. */
    words: string[];
    /**
     * The expected answer, used only to draw an empty slot per remaining word.
     * The slots hint at the shape of the sentence, not at its wording.
     */
    expected: string;
    disabled?: boolean;
    onRemove(word: string, index: number): void;
}

const Strip = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;

    min-height: 76px;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
`;

export const AnswerStrip = ({
    words,
    expected,
    disabled = false,
    onRemove,
}: AnswerStripProps) => {
    const remaining = expected.split(' ').slice(words.length);

    return (
        <Strip>
            {words.map((word, index) => (
                <Chip
                    key={`${word}-${index}`}
                    variant="solid"
                    label={word}
                    disabled={disabled}
                    onClick={() => onRemove(word, index)}
                    trailing={<RemoveIcon size={14} aria-hidden="true" />}
                />
            ))}
            {!disabled &&
                remaining.map((word, index) => (
                    <AnswerSlot
                        key={`slot-${index}`}
                        $length={word.length}
                        aria-hidden="true"
                    />
                ))}
        </Strip>
    );
};
