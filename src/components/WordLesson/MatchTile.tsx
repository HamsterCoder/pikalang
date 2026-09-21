import { Check } from 'lucide-react';
import { styled, css, keyframes } from 'styled-components';

/** What the tile is doing right now, which is the whole of how it looks. */
export type MatchTileState = 'idle' | 'selected' | 'matched' | 'wrong';

export interface MatchTileProps {
    children: string;
    state: MatchTileState;
    /** A small line under the word, such as its gender. */
    caption?: string;
    /** Serbian tiles carry the language being learned and are set apart. */
    tone?: 'serbian' | 'russian';
    /** The key that picks this tile, shown on layouts wide enough for one. */
    hotkey?: string;
    onClick?(): void;
    className?: string;
}

const shake = keyframes`
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
`;

const states: Record<MatchTileState, ReturnType<typeof css>> = {
    idle: css`
        border-color: ${({ theme }) => theme.color.border};
        background-color: ${({ theme }) => theme.color.surface};

        &:hover {
            border-color: ${({ theme }) => theme.color.accentBorder};
            background-color: ${({ theme }) => theme.color.accentWash};
        }
    `,
    selected: css`
        border-color: ${({ theme }) => theme.color.accent};
        background-color: ${({ theme }) => theme.color.accentSoft};
        color: ${({ theme }) => theme.color.accent};
    `,
    matched: css`
        border-color: ${({ theme }) => theme.color.successBorder};
        background-color: ${({ theme }) => theme.color.successSurface};
        color: ${({ theme }) => theme.color.successText};
        cursor: default;
        /* Kept in place so the grid never reflows mid-round, but quietened. */
        opacity: 0.7;
    `,
    wrong: css`
        border-color: ${({ theme }) => theme.color.errorBorder};
        background-color: ${({ theme }) => theme.color.errorSurface};
        color: ${({ theme }) => theme.color.errorText};
        animation: ${shake} 0.3s ease-in-out;

        @media (prefers-reduced-motion: reduce) {
            animation: none;
        }
    `,
};

const Tile = styled.button<{ $state: MatchTileState }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    width: 100%;
    min-height: 3.5rem;
    padding: 0.6rem 0.9rem;
    border: 1px solid;
    border-radius: ${({ theme }) => theme.radius.l};

    text-align: left;
    color: ${({ theme }) => theme.color.text};

    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.subtle};
    transition:
        border-color ${({ theme }) => theme.transition.fast},
        background-color ${({ theme }) => theme.transition.fast},
        color ${({ theme }) => theme.transition.fast};

    ${({ $state }) => states[$state]}

    &:disabled {
        cursor: default;
    }
`;

const Body = styled.span`
    display: flex;
    flex-direction: column;
    min-width: 0;
`;

const Label = styled.span<{ $tone: 'serbian' | 'russian'; $struck: boolean }>`
    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    font-weight: ${({ $tone }) => ($tone === 'serbian' ? 600 : 400)};
    line-height: 1.3;
    text-decoration: ${({ $struck }) => ($struck ? 'line-through' : 'none')};
`;

const Caption = styled.span`
    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.chip.size};
    line-height: 1.3;
    opacity: 0.75;
`;

/**
 * The hotkey badge, which only earns its place where there is a keyboard to
 * press it on. Below that width the tile is tapped instead.
 */
const Hotkey = styled.span`
    display: none;
    flex-shrink: 0;

    padding: 0 0.4rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.s};

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.chip.size};
    line-height: 1.5;
    color: ${({ theme }) => theme.color.hint};

    @container lesson (min-width: 32rem) {
        display: inline-block;
    }
`;

const MatchedMark = styled.span`
    display: flex;
    flex-shrink: 0;
    align-items: center;
`;

/**
 * One half of a pair in the matching round. It says nothing about which column
 * it is in or what it is matched against — the board owns all of that.
 */
export const MatchTile = ({
    children,
    state,
    caption,
    tone = 'serbian',
    hotkey,
    onClick,
    className,
}: MatchTileProps) => {
    const matched = state === 'matched';

    return (
        <Tile
            type="button"
            className={className}
            $state={state}
            aria-pressed={state === 'selected'}
            disabled={matched}
            onClick={onClick}
        >
            <Body>
                <Label $tone={tone} $struck={matched}>
                    {children}
                </Label>
                {caption && <Caption>{caption}</Caption>}
            </Body>

            {matched ? (
                <MatchedMark>
                    <Check size={16} aria-hidden="true" />
                </MatchedMark>
            ) : (
                hotkey && <Hotkey aria-hidden="true">{hotkey}</Hotkey>
            )}
        </Tile>
    );
};
