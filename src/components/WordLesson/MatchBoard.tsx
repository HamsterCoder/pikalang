import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { styled } from 'styled-components';

import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { shuffle } from '@utils/shuffle';

import { MatchTile } from './MatchTile';

export interface MatchWord {
    /** Identifies the pair; the same id sits on both of its tiles. */
    id: string;
    /** The Serbian word, shown in the left column. */
    word: string;
    /** The Russian translation, shown in the right column. */
    translation: string;
    /** A small line under the Serbian word, such as its gender. */
    caption?: string;
}

type Side = 'serbian' | 'russian';

interface Selection {
    side: Side;
    id: string;
}

export interface MatchBoardProps {
    words: MatchWord[];
    /**
     * A pair has been put together. `firstTry` is false once either of its
     * tiles has been part of a wrong guess, which is what a star costs.
     */
    onPairMatched(id: string, firstTry: boolean): void;
    /** A wrong guess, for whatever the screen wants to do about it. */
    onMistake?(): void;
    /** Every pair is matched. Fired once. */
    onComplete?(): void;
    className?: string;
}

/** How long a wrong pair stays lit before the board lets go of it. */
const WRONG_FLASH_MS = 600;

/**
 * The keys that pick a tile, matching the badges on them: the digit row for
 * the Serbian column and the row above it for the Russian one. A set never
 * runs past these, and any extra tile simply goes without a badge.
 */
const SERBIAN_KEYS = ['1', '2', '3', '4', '5', '6'];
const RUSSIAN_KEYS = ['q', 'w', 'e', 'r', 't', 'y'];

const Board = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;

    @container lesson (max-width: 26rem) {
        gap: 0.5rem;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @container lesson (max-width: 26rem) {
        gap: 0.5rem;
    }
`;

const ColumnLabel = styled.h2`
    margin: 0 0 0.25rem;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.chip.size};
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: center;
    color: ${({ theme }) => theme.color.hint};
`;

interface WrongPair {
    serbianId: string;
    russianId: string;
}

/** How many reshuffles to spend before settling for the order in hand. */
const DERANGE_ATTEMPTS = 20;

/**
 * Shuffles the second column until no row holds its own translation, so the
 * board can never be solved by reading straight across. With one pair there is
 * nothing to derange, and the attempts are capped so this always terminates.
 */
function derange(words: MatchWord[], against: MatchWord[]): MatchWord[] {
    let candidate = shuffle([...words]);

    for (let attempt = 0; attempt < DERANGE_ATTEMPTS; attempt += 1) {
        if (candidate.every((word, index) => word.id !== against[index].id)) {
            break;
        }

        candidate = shuffle([...words]);
    }

    return candidate;
}

/**
 * The timed round: Serbian words on the left, their Russian translations on
 * the right, shuffled apart. Unlike the lesson challenges, the board owns its
 * own selection — there is no verdict to hand up and nothing to check, only
 * pairs falling into place — and it reports what it settles as it happens.
 */
export const MatchBoard = ({
    words,
    onPairMatched,
    onMistake,
    onComplete,
    className,
}: MatchBoardProps) => {
    /** `shuffle` works in place, so each column churns its own copy. */
    const serbian = useMemo(() => shuffle([...words]), [words]);
    const russian = useMemo(() => derange(words, serbian), [words, serbian]);

    const [selected, setSelected] = useState<Selection | null>(null);
    const [matched, setMatched] = useState<string[]>([]);
    const [wrong, setWrong] = useState<WrongPair | null>(null);

    /**
     * The interaction runs off refs rather than off the rendered state: two
     * taps can land in the same frame, and a handler reading `selected` from
     * its closure would still be looking at the board before the first one.
     */
    const selectedRef = useRef<Selection | null>(null);
    const matchedRef = useRef<Set<string>>(new Set());
    const wrongRef = useRef(false);
    /** Ids caught in a wrong guess, which is what puts a star out of reach. */
    const missedRef = useRef<Set<string>>(new Set());
    const completed = useRef(false);

    useEffect(() => {
        if (!wrong) {
            return;
        }

        const timeout = window.setTimeout(() => {
            wrongRef.current = false;
            setWrong(null);
        }, WRONG_FLASH_MS);

        return () => window.clearTimeout(timeout);
    }, [wrong]);

    useEffect(() => {
        if (matched.length === words.length && !completed.current) {
            completed.current = true;
            onComplete?.();
        }
    }, [matched.length, words.length, onComplete]);

    const select = useCallback((selection: Selection | null) => {
        selectedRef.current = selection;
        setSelected(selection);
    }, []);

    const pick = useCallback(
        (side: Side, id: string) => {
            // A tile still flashing is not one to build the next guess on.
            if (wrongRef.current || matchedRef.current.has(id)) {
                return;
            }

            const current = selectedRef.current;

            if (!current) {
                select({ side, id });
                return;
            }

            if (current.side === side) {
                // Same column: changing your mind, rather than a guess.
                select(current.id === id ? null : { side, id });
                return;
            }

            select(null);

            if (current.id === id) {
                const firstTry = !missedRef.current.has(id);

                matchedRef.current.add(id);
                setMatched((previous) => [...previous, id]);
                onPairMatched(id, firstTry);
                return;
            }

            missedRef.current.add(id);
            missedRef.current.add(current.id);
            wrongRef.current = true;

            setWrong(
                side === 'serbian'
                    ? { serbianId: id, russianId: current.id }
                    : { serbianId: current.id, russianId: id },
            );
            onMistake?.();
        },
        [select, onPairMatched, onMistake],
    );

    /**
     * The badges on the tiles are the shortcuts: digits pick a Serbian word,
     * the row above it picks a translation, exactly as the lesson screen lets
     * digits pick a picture.
     */
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }

            const key = event.key.toLowerCase();
            const serbianIndex = SERBIAN_KEYS.indexOf(key);

            if (serbianIndex >= 0 && serbian[serbianIndex]) {
                event.preventDefault();
                pick('serbian', serbian[serbianIndex].id);
                return;
            }

            const russianIndex = RUSSIAN_KEYS.indexOf(key);

            if (russianIndex >= 0 && russian[russianIndex]) {
                event.preventDefault();
                pick('russian', russian[russianIndex].id);
            }
        }

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [serbian, russian, pick]);

    function stateOf(side: Side, id: string) {
        if (matched.includes(id)) {
            return 'matched' as const;
        }

        const wrongId = wrong
            ? side === 'serbian'
                ? wrong.serbianId
                : wrong.russianId
            : null;

        if (wrongId === id) {
            return 'wrong' as const;
        }

        return selected?.side === side && selected.id === id
            ? ('selected' as const)
            : ('idle' as const);
    }

    return (
        <Board className={className}>
            <Column>
                <ColumnLabel>
                    {translate(I18NLangs.RU, 'word-match-column-serbian')}
                </ColumnLabel>
                {serbian.map(({ id, word, caption }, index) => (
                    <MatchTile
                        key={id}
                        tone="serbian"
                        caption={caption}
                        hotkey={SERBIAN_KEYS[index]}
                        state={stateOf('serbian', id)}
                        onClick={() => pick('serbian', id)}
                    >
                        {word}
                    </MatchTile>
                ))}
            </Column>

            <Column>
                <ColumnLabel>
                    {translate(I18NLangs.RU, 'word-match-column-russian')}
                </ColumnLabel>
                {russian.map(({ id, translation }, index) => (
                    <MatchTile
                        key={id}
                        tone="russian"
                        hotkey={RUSSIAN_KEYS[index]?.toUpperCase()}
                        state={stateOf('russian', id)}
                        onClick={() => pick('russian', id)}
                    >
                        {translation}
                    </MatchTile>
                ))}
            </Column>
        </Board>
    );
};
