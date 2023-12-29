import { NavLinkProps, NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

import { I18N, I18NLangs } from '@components/I18N/I18N';
import styled from 'styled-components';

interface NavItemProps extends NavLinkProps {
    labelKey: string;
    disabled?: boolean;
    mobile?: boolean;
}

const ItemLayout = ({
    className,
    to,
    labelKey,
    disabled = false,
    onClick,
    mobile = false,
}: NavItemProps) => {
    return (
        <li>
            <NavLink
                to={to}
                onClick={onClick}
                className={[className, disabled ? 'disabled' : ''].join(' ')}
            >
                <Typography
                    variant={mobile ? 'heading_m' : 'heading_l'}
                    color="currentColor"
                >
                    <I18N textKey={labelKey} lang={I18NLangs.RU}></I18N>
                </Typography>
            </NavLink>
        </li>
    );
};

export const NavigationItem = styled(ItemLayout)`
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
