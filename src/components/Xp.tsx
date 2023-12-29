import { Star } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { styled } from 'styled-components';

export interface XpProps {
    mobile?: boolean;
    className?: string;
    xp: number;
}

const Container = styled(Typography)`
    display: flex;
    align-items: center;
`;

export const Xp = ({ mobile = false, className, xp }: XpProps) => {
    return (
        <Container
            className={className}
            variant={mobile ? 'heading_m' : 'heading_l'}
            color="currentcolor"
        >
            {' '}
            <Star fontSize="inherit" sx={{ marginRight: '0.25rem' }} /> {xp}{' '}
        </Container>
    );
};
