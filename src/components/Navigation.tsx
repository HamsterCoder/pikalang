import { styled } from 'styled-components';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Typography } from '@mui/material';

import { I18N, I18NLangs } from '@components/I18N/I18N';

interface NavItemProps extends NavLinkProps {
    labelKey: string;
    disabled?: boolean;
}

const ItemLayout = ({
    className,
    to,
    labelKey,
    disabled = false,
}: NavItemProps) => {
    return (
        <li>
            <NavLink
                to={to}
                className={[className, disabled ? 'disabled' : ''].join(' ')}
            >
                <Typography variant="heading_l" color="currentColor">
                    <I18N textKey={labelKey} lang={I18NLangs.RU}></I18N>
                </Typography>
            </NavLink>
        </li>
    );
};

const List = styled.ul`
    display: flex;

    margin: 0;
    padding: 0;

    list-style-type: none;

    & > li {
        margin-right: 1rem;
    }
`;

const Item = styled(ItemLayout)`
    display: block;

    color: currentColor;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0);
    padding: 0 0.5rem;
    border-radius: 0.5rem;

    transition:
        border-color 0.2s ease-in,
        background-color 0.2s ease-in;

    &:hover&.active {
        background-color: rgba(255, 255, 255, 1);
    }

    &.active {
        background-color: rgba(255, 255, 255, 1);
        color: var(--primary-accent);
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    &.disabled {
        pointer-events: none;
        opacity: 0.5;
    }
`;

export interface NavigationProps {
    links: {
        to: string;
        labelKey: string;
        disabled?: boolean;
    }[];
}

export const Navigation = ({ links }: NavigationProps) => {
    return (
        <nav>
            <List>
                {links.map((link) => (
                    <Item key={link.to} {...link}></Item>
                ))}
            </List>
        </nav>
    );
};
