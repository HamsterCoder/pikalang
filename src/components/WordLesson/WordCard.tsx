import { Lightbulb, Quote } from 'lucide-react';
import { styled } from 'styled-components';

import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { PictureImage } from '@components/Picture/PictureImage';
import { Badge } from '@components/ui/Badge';

import type { WordGender } from '@words/types';

export interface WordCardProps {
    /** The Serbian word, front and centre. */
    word: string;
    /** Its Russian translation. */
    translation: string;
    /** A bare asset name from `public/assets/`, e.g. `sweet-pepper`. */
    image: string;
    gender: WordGender;
    /** A short Serbian sentence putting the word to work. */
    example: string;
    exampleTranslation: string;
    /** An optional note: a false friend, a suffix, a stress pattern. */
    tip?: string;
    className?: string;
}

const genderKeys: Record<WordGender, string> = {
    m: 'word-gender-masculine',
    f: 'word-gender-feminine',
    n: 'word-gender-neuter',
};

const Card = styled.article`
    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;

    padding: 1.5rem 1.25rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.subtle};
    text-align: center;
`;

/**
 * A wash of the brand behind the top corner, so the card reads as a moment of
 * its own rather than as another panel.
 */
const Glow = styled.div`
    position: absolute;
    top: -4rem;
    right: -4rem;
    z-index: 0;

    width: 10rem;
    height: 10rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    background-color: ${({ theme }) => theme.color.accentWash};
    pointer-events: none;
`;

/** Everything sits above the glow. */
const Layer = styled.div`
    position: relative;
    z-index: 1;

    display: contents;
`;

const Illustration = styled.div`
    overflow: hidden;

    width: 11rem;
    height: 11rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surfaceMuted};

    /* PictureImage renders an inline picture element; give it a box to fill. */
    & > picture {
        display: block;

        width: 100%;
        height: 100%;
    }

    @container lesson (max-width: 30rem) {
        width: 9rem;
        height: 9rem;
    }
`;

const Word = styled.h1`
    margin: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.heading_l.size};
    font-weight: ${({ theme }) => theme.text.heading_l.weight};
    line-height: 1.2;
    color: ${({ theme }) => theme.color.heading};

    @container lesson (max-width: 30rem) {
        font-size: ${({ theme }) => theme.text.heading_m.size};
    }
`;

const Translation = styled.p`
    margin: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.heading_s.size};
    font-weight: ${({ theme }) => theme.text.heading_s.weight};
    color: ${({ theme }) => theme.color.text};
`;

const Note = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;

    width: 100%;
    padding: 0.875rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surfaceSunken};
    text-align: left;
`;

const NoteIcon = styled.span<{ $tone: 'accent' | 'trophy' }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 2rem;
    height: 2rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme, $tone }) =>
        $tone === 'trophy' ? theme.color.trophy : theme.color.accent};
    background-color: ${({ theme, $tone }) =>
        $tone === 'trophy'
            ? theme.color.trophySurface
            : theme.color.accentSoft};
`;

const NoteBody = styled.div`
    flex: 1 1 auto;
    min-width: 0;
`;

const Example = styled.p`
    margin: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.text_primary.size};
    font-weight: 500;
    line-height: ${({ theme }) => theme.text.text_primary.lineHeight};
    color: ${({ theme }) => theme.color.text};
`;

const ExampleTranslation = styled.p`
    margin: 0.15rem 0 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    color: ${({ theme }) => theme.color.hint};
`;

const TipLabel = styled.span`
    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.chip.size};
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.trophy};
`;

/**
 * One new word, the way the learner first meets it: the picture, the word
 * itself, what it means, and a sentence it lives in. Everything here is
 * reading — the controls for moving on belong to the footer.
 */
export const WordCard = ({
    word,
    translation,
    image,
    gender,
    example,
    exampleTranslation,
    tip,
    className,
}: WordCardProps) => {
    return (
        <Card className={className}>
            <Glow aria-hidden="true" />

            <Layer>
                <Illustration>
                    <PictureImage image={image} />
                </Illustration>

                <Word>{word}</Word>

                <Badge tone="accent">
                    <I18N textKey={genderKeys[gender]} lang={I18NLangs.RU} />
                </Badge>

                <Translation>{translation}</Translation>

                <Note>
                    <NoteIcon $tone="accent">
                        <Quote size={16} aria-hidden="true" />
                    </NoteIcon>
                    <NoteBody>
                        <Example>{example}</Example>
                        <ExampleTranslation>
                            {exampleTranslation}
                        </ExampleTranslation>
                    </NoteBody>
                </Note>

                {tip && (
                    <Note>
                        <NoteIcon $tone="trophy">
                            <Lightbulb size={16} aria-hidden="true" />
                        </NoteIcon>
                        <NoteBody>
                            <TipLabel>
                                <I18N
                                    textKey="word-tip-label"
                                    lang={I18NLangs.RU}
                                />
                            </TipLabel>
                            <ExampleTranslation>{tip}</ExampleTranslation>
                        </NoteBody>
                    </Note>
                )}
            </Layer>
        </Card>
    );
};
