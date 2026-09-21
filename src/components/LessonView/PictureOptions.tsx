import { Check } from 'lucide-react';
import { styled } from 'styled-components';

import { PictureImage } from '@components/Picture/PictureImage';

export interface PictureOptionsProps {
    images: string[];
    /** The chosen image, or `null` while the learner is still deciding. */
    selected: string | null;
    disabled?: boolean;
    onSelect(image: string): void;
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
`;

const Option = styled.button`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
    cursor: pointer;

    transition:
        border-color ${({ theme }) => theme.transition.fast},
        background-color ${({ theme }) => theme.transition.fast};

    &:hover:not(:disabled) {
        border-color: ${({ theme }) => theme.color.borderStrong};
    }

    &[aria-pressed='true'] {
        border-color: ${({ theme }) => theme.color.accent};
        background-color: ${({ theme }) => theme.color.accentWash};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.color.accentSoft};
    }

    &:disabled {
        cursor: default;
    }

    &:disabled:not([aria-pressed='true']) {
        opacity: 0.55;
    }
`;

/** Capped so all four options fit on a phone screen without scrolling. */
const Frame = styled.div`
    overflow: hidden;

    width: 100%;
    max-width: 8rem;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radius.m};
`;

/** The keyboard shortcut that picks this option. */
const Shortcut = styled.span`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.s};

    background-color: ${({ theme }) => theme.color.surface};
    color: ${({ theme }) => theme.color.hint};

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    line-height: 1;
`;

const Selected = styled.span`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.25rem;
    height: 1.25rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    background-color: ${({ theme }) => theme.color.accent};
    color: ${({ theme }) => theme.color.textInverted};
`;

/**
 * The options carry no captions: the learner is matching a Serbian word to a
 * picture, and naming the pictures would answer the challenge for them.
 */
export const PictureOptions = ({
    images,
    selected,
    disabled = false,
    onSelect,
}: PictureOptionsProps) => {
    return (
        <Grid>
            {images.map((image, index) => (
                <Option
                    key={image}
                    type="button"
                    aria-pressed={selected === image}
                    disabled={disabled}
                    onClick={() => onSelect(image)}
                >
                    <Shortcut aria-hidden="true">{index + 1}</Shortcut>
                    {selected === image && (
                        <Selected aria-hidden="true">
                            <Check size={14} />
                        </Selected>
                    )}
                    <Frame>
                        <PictureImage image={image} />
                    </Frame>
                </Option>
            ))}
        </Grid>
    );
};
