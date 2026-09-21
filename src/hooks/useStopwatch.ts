import { useCallback, useEffect, useRef, useState } from 'react';

export interface Stopwatch {
    /** Time on the clock, in ms. Keeps its value once the clock is stopped. */
    elapsedMs: number;
    running: boolean;
    start(): void;
    /** Stops the clock and hands back the final reading. */
    stop(): number;
}

/** How often the reading is refreshed while the clock runs. */
const TICK_MS = 100;

/**
 * A clock that counts up. The reading is computed from `Date.now()` on every
 * tick rather than accumulated, so it cannot drift when the tab is throttled
 * or a render is late.
 */
export function useStopwatch(): Stopwatch {
    const startedAt = useRef<number | null>(null);
    const [elapsedMs, setElapsedMs] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (!running) {
            return;
        }

        const interval = window.setInterval(() => {
            if (startedAt.current !== null) {
                setElapsedMs(Date.now() - startedAt.current);
            }
        }, TICK_MS);

        return () => window.clearInterval(interval);
    }, [running]);

    const start = useCallback(() => {
        startedAt.current = Date.now();
        setElapsedMs(0);
        setRunning(true);
    }, []);

    const stop = useCallback(() => {
        const final =
            startedAt.current === null ? 0 : Date.now() - startedAt.current;

        setElapsedMs(final);
        setRunning(false);

        return final;
    }, []);

    return { elapsedMs, running, start, stop };
}
