import { styled, css } from 'styled-components';
import { NavLink } from 'react-router';

import { UnstyledList } from '@components/Navigation/UnstyledList';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { AppNavLink } from '@components/AppHeader/navLinks';

export interface HeaderNavProps {
    links: AppNavLink[];
    className?: string;
}

const List = styled(UnstyledList)`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const itemStyles = css`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    padding: 0.45rem 0.8rem;
    border-radius: ${({ theme }) => theme.radius.m};

    color: ${({ theme }) => theme.color.hint};
    text-decoration: none;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    font-weight: 500;
    white-space: nowrap;
`;

/**
 * `NavLink` adds the `active` class itself. Do not pass it a `className`
 * function — styled-components already owns that prop, and the function is
 * dropped on the way through.
 */
const Item = styled(NavLink)`
    ${itemStyles}

    transition:
        color ${({ theme }) => theme.transition.fast},
        background-color ${({ theme }) => theme.transition.fast};

    &:hover {
        background-color: ${({ theme }) => theme.color.accentWash};
        color: ${({ theme }) => theme.color.accent};
    }

    &.active {
        color: ${({ theme }) => theme.color.accent};
        background-color: ${({ theme }) => theme.color.accentSoft};
    }
`;

/** A destination that does not exist yet: announced, but not reachable. */
const UpcomingItem = styled.span`
    ${itemStyles}

    color: ${({ theme }) => theme.color.disabledText};
    cursor: default;
`;

/** Marks the current destination without relying on colour alone. */
const ActiveMark = styled.span`
    width: 0.3rem;
    height: 0.9rem;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.color.accent};
`;

/** The horizontal destination list shown in the header on wide layouts. */
export const HeaderNav = ({ links, className }: HeaderNavProps) => {
    return (
        <nav className={className}>
            <List>
                {links.map(({ to, labelKey, icon: Icon, disabled }) => (
                    <li key={to}>
                        {disabled ? (
                            <UpcomingItem aria-disabled="true">
                                <Icon size={18} aria-hidden="true" />
                                <I18N textKey={labelKey} lang={I18NLangs.RU} />
                            </UpcomingItem>
                        ) : (
                            <Item to={to}>
                                {({ isActive }) => (
                                    <>
                                        <Icon size={18} aria-hidden="true" />
                                        <I18N
                                            textKey={labelKey}
                                            lang={I18NLangs.RU}
                                        />
                                        {isActive && <ActiveMark />}
                                    </>
                                )}
                            </Item>
                        )}
                    </li>
                ))}
            </List>
        </nav>
    );
};
