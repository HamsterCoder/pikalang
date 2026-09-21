import { ReactNode } from 'react';
import { styled } from 'styled-components';

export interface ChallengePromptProps {
    children: ReactNode;
    className?: string;
}

const Prompt = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.heading_s.size};
    font-weight: ${({ theme }) => theme.text.heading_s.weight};
    color: ${({ theme }) => theme.color.heading};

    &::before {
        content: '';

        flex-shrink: 0;
        width: 6px;
        height: 1.25rem;
        border-radius: ${({ theme }) => theme.radius.pill};

        background-color: ${({ theme }) => theme.color.accent};
    }
`;

/**
 * What the learner is being asked to do, opened by the accent rule from the
 * design. The only such rule on the screen: the subject below it is a card,
 * and a second rule a few pixels away reads as noise rather than emphasis.
 */
export const ChallengePrompt = ({
    children,
    className,
}: ChallengePromptProps) => {
    return <Prompt className={className}>{children}</Prompt>;
};
