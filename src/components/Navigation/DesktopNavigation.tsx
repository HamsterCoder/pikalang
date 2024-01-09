import { styled } from 'styled-components';

import { UnstyledList } from './UnstyledList';
import { NavigationItem } from './NavigationItem';

export interface NavigationLink {
    to: string;
    labelKey: string;
    disabled?: boolean;
}

export interface DesktopNavigationProps {
    links: NavigationLink[];
}

const List = styled(UnstyledList)`
    display: flex;

    & > li {
        margin-right: 1rem;
    }
`;

export const DesktopNavigation = ({ links }: DesktopNavigationProps) => {
    return (
        <nav>
            <List>
                {links.map((link) => (
                    <li>
                        <NavigationItem
                            key={link.to}
                            {...link}
                        ></NavigationItem>
                    </li>
                ))}
            </List>
        </nav>
    );
};
