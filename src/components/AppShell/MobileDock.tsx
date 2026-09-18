import { styled, css } from 'styled-components';
import { NavLink } from 'react-router';

import { UnstyledList } from '@components/ui/UnstyledList';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { AppNavLink } from '@components/AppShell/navLinks';

export interface MobileDockProps {
    links: AppNavLink[];
    className?: string;
}

/** Height of the dock, so layouts can keep content clear of it. */
export const MOBILE_DOCK_HEIGHT = '4rem';

const Dock = styled.nav`
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;

    border-top: 1px solid ${({ theme }) => theme.color.border};
    background-color: ${({ theme }) => theme.color.surface};

    /* Keeps the labels above the home indicator on iOS. */
    padding-bottom: env(safe-area-inset-bottom, 0);
`;

const List = styled(UnstyledList)`
    display: flex;
    align-items: stretch;
    justify-content: space-around;

    height: ${MOBILE_DOCK_HEIGHT};

    & > li {
        flex: 1 1 0;
        min-width: 0;
    }
`;

const itemStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.15rem;

    height: 100%;

    color: ${({ theme }) => theme.color.hint};
    text-decoration: none;

    font-family: ${({ theme }) => theme.font.base};
    font-size: 0.6875rem;
    font-weight: 500;
`;

/** `NavLink` applies the `active` class itself; see the note in `HeaderNav`. */
const Item = styled(NavLink)`
    ${itemStyles}

    transition: color ${({ theme }) => theme.transition.fast};

    &.active {
        color: ${({ theme }) => theme.color.accent};
    }
`;

const UpcomingItem = styled.span`
    ${itemStyles}

    color: ${({ theme }) => theme.color.disabledText};
    cursor: default;
`;

const Label = styled.span`
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

/** The bottom navigation dock that replaces the header nav on phones. */
export const MobileDock = ({ links, className }: MobileDockProps) => {
    return (
        <Dock className={className}>
            <List>
                {links.map(({ to, labelKey, icon: Icon, disabled }) => {
                    const content = (
                        <>
                            <Icon size={22} aria-hidden="true" />
                            <Label>
                                <I18N textKey={labelKey} lang={I18NLangs.RU} />
                            </Label>
                        </>
                    );

                    return (
                        <li key={to}>
                            {disabled ? (
                                <UpcomingItem aria-disabled="true">
                                    {content}
                                </UpcomingItem>
                            ) : (
                                <Item to={to}>{content}</Item>
                            )}
                        </li>
                    );
                })}
            </List>
        </Dock>
    );
};
