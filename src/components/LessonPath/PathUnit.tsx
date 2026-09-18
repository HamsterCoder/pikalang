import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { styled, keyframes } from 'styled-components';
import { Collapsible } from 'radix-ui';
import { ChevronDown } from 'lucide-react';

import { IconButton } from '@components/ui/IconButton';
import { UnstyledList } from '@components/Navigation/UnstyledList';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { LessonListItem } from '@api/lessons';

import { CompactLesson } from '@components/LessonPath/CompactLesson';
import { NextUnitCard, PathEnd } from '@components/LessonPath/NextUnitCard';
import { PathLesson } from '@components/LessonPath/PathLesson';
import { UnitBanner } from '@components/LessonPath/UnitBanner';
import { LessonPathState } from '@components/LessonPath/types';

export interface NextUnit {
    title: string;
    lessonCount: number;
}

export interface PathUnitProps {
    /** Position of the unit on the path, counted from 1. */
    index: number;
    title: string;
    lessons: LessonListItem[];
    /** Teased at the end of the unit; omit for the last one. */
    nextUnit?: NextUnit;
    /** Units the learner is not working on start collapsed. */
    defaultOpen?: boolean;
    className?: string;
}

const Unit = styled.section`
    & + & {
        margin-top: 2.5rem;
    }

    /*
     * Where the unit is parked when a toggle happens off-screen: far enough
     * down to clear the sticky header. Read back by settle(), so this stays
     * the single definition of the offset.
     */
    scroll-margin-top: 5rem;
`;

const expand = keyframes`
    from {
        height: 0;
        opacity: 0;
    }
    to {
        height: var(--radix-collapsible-content-height);
        opacity: 1;
    }
`;

const collapse = keyframes`
    from {
        height: var(--radix-collapsible-content-height);
        opacity: 1;
    }
    to {
        height: 0;
        opacity: 0;
    }
`;

/**
 * Both representations of a unit animate, so the swap reads as one movement
 * rather than a jump. The inline padding gives the active card's pulse room to
 * show: the overflow:hidden that makes the height animation work would
 * otherwise clip it.
 */
const Region = styled(Collapsible.Content)`
    overflow: hidden;
    margin: 0 -10px;
    padding: 0 10px;

    &[data-state='open'] {
        animation: ${expand} 260ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &[data-state='closed'] {
        animation: ${collapse} 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @media (prefers-reduced-motion: reduce) {
        &[data-state='open'],
        &[data-state='closed'] {
            animation: none;
        }
    }
`;

const Toggle = styled(IconButton)`
    flex-shrink: 0;

    svg {
        transition: transform ${({ theme }) => theme.transition.fast};
    }

    &[data-state='open'] svg {
        transform: rotate(180deg);
    }
`;

const Milestones = styled.ol`
    /* Style resets */
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Milestone = styled.li`
    min-width: 0;
`;

const Summary = styled(UnstyledList)`
    display: flex;
    flex-direction: column;
    gap: 0.15rem;

    margin-top: 0.75rem;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
`;

const Outro = styled.div`
    margin-top: 0.75rem;
`;

function isCompleted(lesson: LessonListItem) {
    return lesson.progress >= 100;
}

/**
 * A lesson is `active` when it is the one the learner should open next. The
 * unlock rule already guarantees there is at most one such lesson per unit:
 * everything after the first unfinished lesson is locked.
 */
function getLessonState(lesson: LessonListItem): LessonPathState {
    if (lesson.locked) {
        return 'locked';
    }

    return isCompleted(lesson) ? 'completed' : 'active';
}

/**
 * One unit of the path. Expanded it shows the full milestone cards; collapsed
 * it falls back to a dense list, so a long path stays scannable.
 */
export const PathUnit = ({
    index,
    title,
    lessons,
    nextUnit,
    defaultOpen = true,
    className,
}: PathUnitProps) => {
    const [open, setOpen] = useState(defaultOpen);
    const unitRef = useRef<HTMLElement>(null);
    /** Where the unit sat in the viewport when the reader hit the toggle. */
    const anchorTop = useRef<number | null>(null);

    /**
     * Put the unit back where the reader left it.
     *
     * Toggling changes the height of everything below the banner, and the
     * browser does not keep up on its own: collapsing near the end of the page
     * clamps the scroll offset, which throws the reader hundreds of pixels up.
     * Expanding while the banner sits above the fold is just as disorienting —
     * the unit opens around the viewport rather than below it — so a toggle
     * that happened off-screen also pulls the unit back into view.
     */
    const settle = useCallback(() => {
        const unit = unitRef.current;
        const previousTop = anchorTop.current;

        if (!unit || previousTop === null) {
            return;
        }

        const safeTop = parseFloat(getComputedStyle(unit).scrollMarginTop) || 0;
        const delta =
            unit.getBoundingClientRect().top - Math.max(previousTop, safeTop);

        if (Math.abs(delta) > 1) {
            window.scrollBy(0, delta);
        }
    }, []);

    const handleOpenChange = (next: boolean) => {
        anchorTop.current =
            unitRef.current?.getBoundingClientRect().top ?? null;
        setOpen(next);
    };

    // The height animation keeps moving the page after the state change, so
    // correct once up front and again once the animation has settled.
    useLayoutEffect(settle, [open, settle]);

    const completed = lessons.filter(isCompleted).length;

    return (
        <Collapsible.Root open={open} onOpenChange={handleOpenChange} asChild>
            <Unit
                ref={unitRef}
                className={className}
                onAnimationEnd={(event) => {
                    if (
                        event.target !== event.currentTarget &&
                        (event.target as HTMLElement).dataset.state
                    ) {
                        settle();
                    }
                }}
            >
                <UnitBanner
                    index={index}
                    title={title}
                    completed={completed}
                    total={lessons.length}
                    trigger={
                        <Collapsible.Trigger asChild>
                            <Toggle
                                aria-label={translate(
                                    I18NLangs.RU,
                                    open
                                        ? 'lesson-path-unit-collapse'
                                        : 'lesson-path-unit-expand',
                                    { title },
                                )}
                            >
                                <ChevronDown size={22} aria-hidden="true" />
                            </Toggle>
                        </Collapsible.Trigger>
                    }
                />

                <Collapsible.Root open={!open}>
                    <Region>
                        <Summary>
                            {lessons.map((lesson) => (
                                <li key={lesson.id}>
                                    <CompactLesson
                                        state={getLessonState(lesson)}
                                        title={`${lesson.displayTopic} · ${lesson.displayName}`}
                                        topic={lesson.topic}
                                        to={`/lessons/${lesson.id}`}
                                        currentTries={lesson.currentTries}
                                        recommendedTries={
                                            lesson.recommendedTries
                                        }
                                    />
                                </li>
                            ))}
                        </Summary>
                    </Region>
                </Collapsible.Root>

                <Region>
                    <Milestones>
                        {lessons.map((lesson, lessonIndex) => (
                            <Milestone key={lesson.id}>
                                <PathLesson
                                    state={getLessonState(lesson)}
                                    index={lessonIndex + 1}
                                    unitIndex={index}
                                    title={`${lesson.displayTopic} · ${lesson.displayName}`}
                                    description={lesson.description}
                                    topic={lesson.topic}
                                    to={`/lessons/${lesson.id}`}
                                    currentTries={lesson.currentTries}
                                    recommendedTries={lesson.recommendedTries}
                                    connected={lessonIndex < lessons.length - 1}
                                />
                            </Milestone>
                        ))}
                    </Milestones>

                    <Outro>
                        {nextUnit ? (
                            <NextUnitCard
                                title={nextUnit.title}
                                lessonCount={nextUnit.lessonCount}
                            />
                        ) : (
                            <PathEnd />
                        )}
                    </Outro>
                </Region>
            </Unit>
        </Collapsible.Root>
    );
};
