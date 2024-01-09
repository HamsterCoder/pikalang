import { NavLinkProps, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { I18N, I18NLangs } from '@components/I18N/I18N';
import { Heading } from '@components/Heading';

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
        <NavLink
            to={to}
            onClick={onClick}
            className={[className, disabled ? 'disabled' : ''].join(' ')}
        >
            <Heading size="l" color="currentColor" mobile={mobile}>
                <I18N textKey={labelKey} lang={I18NLangs.RU}></I18N>
            </Heading>
        </NavLink>
    );
};

export const NavigationItem = styled(ItemLayout)`
    text-decoration: none;

    display: block;
    padding: 0 0.5rem;
    border-radius: 0.5rem;

    background-color: rgba(255, 255, 255, 0);
    color: var(--inverted-text-color);

    transition:
        color 0.2s ease-in,
        background-color 0.2s ease-in;

    &:hover.active,
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
