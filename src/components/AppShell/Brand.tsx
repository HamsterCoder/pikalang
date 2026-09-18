import { styled } from 'styled-components';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router';

export interface BrandProps {
    /** Course name shown under the wordmark; omitted on compact layouts. */
    subtitle?: string;
    className?: string;
}

const Container = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;

    color: inherit;
    text-decoration: none;
`;

const Mark = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 2.5rem;
    height: 2.5rem;
    border-radius: ${({ theme }) => theme.radius.l};

    color: ${({ theme }) => theme.color.textInverted};
    background-image: ${({ theme }) =>
        `linear-gradient(135deg, ${theme.color.accent}, ${theme.color.accentFaded})`};
    box-shadow: ${({ theme }) => theme.shadow.subtle};
`;

const Names = styled.span`
    display: flex;
    flex-direction: column;
    min-width: 0;
`;

const Wordmark = styled.span`
    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.heading_s.size};
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.heading};
`;

const Subtitle = styled.span`
    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.chip.size};
    line-height: 1.4;
    color: ${({ theme }) => theme.color.hint};
`;

/** The product mark in the header: icon tile plus wordmark, links home. */
export const Brand = ({ subtitle, className }: BrandProps) => {
    return (
        <Container to="/" className={className} aria-label="Pikalang">
            <Mark>
                <GraduationCap size={24} aria-hidden="true" />
            </Mark>
            <Names>
                <Wordmark>Pikalang</Wordmark>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </Names>
        </Container>
    );
};
