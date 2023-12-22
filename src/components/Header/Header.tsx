import { styled } from 'styled-components';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { Navigation } from '@components/Navigation';

// TODO need mobile layout for header

const XP = styled.div`
    margin-left: auto;
`;

export const HeaderContainer = styled.div`
    background-color: var(--primary-accent);
    color: var(--inverted-text-color);
    margin-bottom: 1rem;
    padding: 1rem 2rem;
    display: flex;
`;

export interface HeaderProps {
    xp?: number;
}

export const Header = ({ xp = 0 }: HeaderProps) => {
    const pages = [
        {
            to: '/lessons/',
            labelKey: 'lesson-list-heading',
        },
        {
            to: '/conversations/',
            labelKey: 'conversation-list-heading',
        },
        {
            to: '/words/',
            labelKey: 'Слова',
            disabled: true,
        },
    ];

    return (
        <HeaderContainer>
            <Navigation links={pages} />
            <XP>
                <Typography variant="heading_l" color="currentcolor">
                    {' '}
                    <StarIcon
                        fontSize="inherit"
                        sx={{ marginBottom: '-5px' }}
                    />{' '}
                    {xp}{' '}
                </Typography>
            </XP>
        </HeaderContainer>
    );
};
