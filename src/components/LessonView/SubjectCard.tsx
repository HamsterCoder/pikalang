import { ReactNode } from 'react';
import { styled } from 'styled-components';

export interface SubjectCardProps {
    /** The sentence, question or word the challenge is about. */
    children: ReactNode;
    /** Shown under the subject, e.g. a hint about what to do with it. */
    caption?: ReactNode;
    /** An illustration shown above the subject, when the challenge has one. */
    illustration?: ReactNode;
    className?: string;
}

const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.subtle};
`;

const Subject = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.heading_s.size};
    font-weight: ${({ theme }) => theme.text.heading_s.weight};
    line-height: ${({ theme }) => theme.text.heading_s.lineHeight};
    color: ${({ theme }) => theme.color.heading};
`;

const Caption = styled.p`
    margin: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    color: ${({ theme }) => theme.color.hint};
`;

const Illustration = styled.div`
    align-self: center;
`;

export const SubjectCard = ({
    children,
    caption,
    illustration,
    className,
}: SubjectCardProps) => {
    return (
        <Card className={className}>
            {illustration && <Illustration>{illustration}</Illustration>}
            <Subject>{children}</Subject>
            {caption && <Caption>{caption}</Caption>}
        </Card>
    );
};
