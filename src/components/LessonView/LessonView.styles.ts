import { styled } from 'styled-components';

/** How wide the lesson reads. The bars span the screen, their controls do not. */
export const LESSON_WIDTH = '40rem';

/**
 * One column of lesson content, centred. The top bar, the challenge and the
 * footer all use it, so their controls line up with the challenge above them
 * however wide the window gets.
 */
export const LessonRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    width: 100%;
    max-width: ${LESSON_WIDTH};
    margin: 0 auto;
    padding: 0 1rem;
`;
