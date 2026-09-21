import { styled } from 'styled-components';

/**
 * An empty place in an answer: a dashed outline roughly as wide as the word
 * that belongs in it, so the shape of the sentence is visible before it is
 * filled in. Shared by the answer strip and the inline blanks.
 */
export const AnswerSlot = styled.span<{ $length: number }>`
    display: inline-block;

    height: 36px;
    width: ${({ $length }) => Math.min(Math.max($length, 2), 12) * 0.6}rem;

    border: 1px dashed ${({ theme }) => theme.color.borderStrong};
    border-radius: ${({ theme }) => theme.radius.m};
    background-color: ${({ theme }) => theme.color.accentWash};

    vertical-align: middle;
`;
