import {
    AnimationEvent,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import { styled, css, keyframes } from 'styled-components';

export interface ChallengeStageProps {
    children: ReactNode;
    /**
     * Plays the way out. The stage stays gone once it has left, so whatever
     * replaces it has to come in under a new `key`, which plays the way in.
     */
    leaving?: boolean;
    /** Called once the stage has left, which is when the lesson moves on. */
    onLeft?(): void;
    className?: string;
}

const OFFSET = '2.5rem';

/**
 * How long to wait for the way out before moving on regardless. Longer than
 * `transition.leave`, so it only matters when the animation never reports its
 * end — it is cancelled, or the tab is hidden and paints no frames.
 */
const LEAVE_TIMEOUT = 400;

const slideIn = keyframes`
    from { opacity: 0; transform: translateX(${OFFSET}); }
    to { opacity: 1; transform: none; }
`;

const slideOut = keyframes`
    from { opacity: 1; transform: none; }
    to { opacity: 0; transform: translateX(-${OFFSET}); }
`;

const Stage = styled.div<{ $leaving: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    ${({ $leaving, theme }) =>
        $leaving
            ? css`
                  animation: ${slideOut} ${theme.transition.leave} forwards;
                  pointer-events: none;
              `
            : css`
                  animation: ${slideIn} ${theme.transition.enter} both;
              `}

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * One screen of a lesson — the help, a challenge or the results. It slides in
 * from the right as it mounts and out to the left when told to leave, so going
 * forward reads as moving along a line rather than the page being swapped.
 */
export const ChallengeStage = ({
    children,
    leaving = false,
    onLeft,
    className,
}: ChallengeStageProps) => {
    const left = useRef(false);

    // The animation and the timer race; whichever is first moves on, once.
    const leave = useCallback(() => {
        if (!left.current) {
            left.current = true;
            onLeft?.();
        }
    }, [onLeft]);

    useEffect(() => {
        if (!leaving) {
            return;
        }

        // Without motion there is no animation to end, so the stage leaves at once.
        const timer = setTimeout(leave, reducedMotion() ? 0 : LEAVE_TIMEOUT);

        return () => clearTimeout(timer);
    }, [leaving, leave]);

    function onAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
        // The challenge inside animates too; only the stage's own exit counts.
        if (leaving && event.target === event.currentTarget) {
            leave();
        }
    }

    return (
        <Stage
            className={className}
            $leaving={leaving}
            onAnimationEnd={onAnimationEnd}
        >
            {children}
        </Stage>
    );
};
