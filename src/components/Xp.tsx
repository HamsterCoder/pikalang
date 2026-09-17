import { Star } from 'lucide-react';
import { styled } from 'styled-components';

export interface XpProps {
    mobile?: boolean;
    className?: string;
    xp: number;
}

const Container = styled.span<{ $mobile: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    color: currentColor;
    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme, $mobile }) =>
        $mobile ? theme.text.heading_m.size : theme.text.heading_l.size};
    font-weight: ${({ theme }) => theme.text.heading_l.weight};
`;

export const Xp = ({ mobile = false, className, xp }: XpProps) => {
    return (
        <Container className={className} $mobile={mobile}>
            <Star size="1em" fill="currentColor" aria-hidden="true" />
            {xp}
        </Container>
    );
};
