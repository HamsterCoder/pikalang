import { styled, css } from 'styled-components';
import { NavLink } from 'react-router';

import { UnstyledList } from '@components/Navigation/UnstyledList';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { Brand } from '@components/AppShell/Brand';
import { AppNavLink } from '@components/AppShell/navLinks';

export interface SideNavProps {
    links: AppNavLink[];
    className?: string;
}

/** Width of the rail, so layouts can leave room for it. */
export const SIDE_NAV_WIDTH = '16rem';

const Rail = styled.aside`
    position: fixed;
    z-index: 6;
    top: 0;
    bottom: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    width: ${SIDE_NAV_WIDTH};
    padding: 1rem;
    border-right: 1px solid ${({ theme }) => theme.color.border};

    background-color: ${({ theme }) => theme.color.surface};
`;

const BrandLink = styled(Brand)`
    padding: 0.5rem 0.75rem;
`;

const List = styled(UnstyledList)`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const itemStyles = css`
    display: flex;
    align-items: center;
    gap: 0.875rem;

    padding: 0.6rem 0.875rem;
    border-radius: ${({ theme }) => theme.radius.m};

    color: ${({ theme }) => theme.color.hint};
    text-decoration: none;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    font-weight: 500;
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
    height: 1rem;
    margin-left: auto;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.color.accent};
`;

/**
 * The left rail: brand and destinations. It carries the navigation on wide
 * layouts so the top bar is free for the learner's own state, and is replaced
 * by `MobileDock` on phones.
 */
export const SideNav = ({ links, className }: SideNavProps) => {
    return (
        <Rail
            className={className}
            aria-label={translate(I18NLangs.RU, 'app-navigation-label')}
        >
            <BrandLink subtitle={translate(I18NLangs.RU, 'course-subtitle')} />

            <nav>
                <List>
                    {links.map(({ to, labelKey, icon: Icon, disabled }) => (
                        <li key={to}>
                            {disabled ? (
                                <UpcomingItem aria-disabled="true">
                                    <Icon size={20} aria-hidden="true" />
                                    <I18N
                                        textKey={labelKey}
                                        lang={I18NLangs.RU}
                                    />
                                </UpcomingItem>
                            ) : (
                                <Item to={to}>
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                size={20}
                                                aria-hidden="true"
                                            />
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
        </Rail>
    );
};
