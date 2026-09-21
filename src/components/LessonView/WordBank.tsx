import { RotateCcw } from 'lucide-react';
import { styled } from 'styled-components';

import { Chip } from '@components/ui/Chip';
import { Button } from '@components/ui/Button';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';

export interface WordBankProps {
    words: string[];
    /** Indices of `words` already placed into the answer. */
    usedIndices: number[];
    disabled?: boolean;
    onPick(word: string, index: number): void;
    onReset(): void;
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    margin-bottom: 0.75rem;
`;

const Label = styled.span`
    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.hint};
`;

/**
 * A fixed grid rather than a wrapping row: a word that has been used stays in
 * place and greys out, so the remaining words never shift under the finger.
 */
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;

    @container lesson (min-width: 480px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
`;

export const WordBank = ({
    words,
    usedIndices,
    disabled = false,
    onPick,
    onReset,
}: WordBankProps) => {
    const used = new Set(usedIndices);

    return (
        <div>
            <Header>
                <Label>
                    <I18N textKey="lesson-word-bank" lang={I18NLangs.RU} />
                </Label>
                <Button
                    variant="text"
                    size="small"
                    onClick={onReset}
                    disabled={disabled || usedIndices.length === 0}
                >
                    <RotateCcw size={14} aria-hidden="true" />
                    <I18N textKey="lesson-reset-answer" lang={I18NLangs.RU} />
                </Button>
            </Header>
            <Grid>
                {words.map((word, index) => (
                    <Chip
                        key={`${word}-${index}`}
                        variant="bank"
                        label={word}
                        disabled={disabled || used.has(index)}
                        onClick={() => onPick(word, index)}
                    />
                ))}
            </Grid>
        </div>
    );
};
