import { styled } from 'styled-components';
import { IconButton, Typography } from '@mui/material';

import { I18N, I18NLangs } from '@components/I18N/I18N';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';

import { NavigationItem } from './NavigationItem';
import { UnstyledList } from './UnstyledList';
import { useMatches } from 'react-router-dom';

export interface NavigationLink {
    to: string;
    labelKey: string;
    disabled?: boolean;
}

export interface NavigationProps {
    links: NavigationLink[];
}

const DropdownMenu = styled.div`
    position: absolute;
    z-index: -1;
    top: calc(2rem + 40px);
    left: 0;
    right: 0;
    background-color: var(--primary-accent-faded);
    padding: 1rem 2rem;
    visibility: hidden;
    opacity: 0.6;
    transform: translateY(-100%);
    transition:
        opacity,
        transform 0.3s ease-in;
    border-radius: 0 0 1rem 1rem;
    box-shadow:
        2px 4px 3px -3px var(--primary-accent),
        -2px 4px 3px -3px var(--primary-accent);

    &[data-open='true'] {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }
`;

export const MobileNavigation = ({ links }: NavigationProps) => {
    const [open, setOpen] = useState(false);

    const match = useMatches();

    const currentLink = links.find((link) => {
        return link.to === match[1].pathname;
    });
    const otherLinks = links.filter((link) => {
        return link.to !== match[1].pathname;
    });

    return (
        <>
            <IconButton
                onClick={() => setOpen(!open)}
                color="inherit"
                aria-label="menu"
            >
                <Menu />
            </IconButton>
            {currentLink && (
                <Typography variant="heading_m" color="currentcolor">
                    <I18N
                        textKey={currentLink.labelKey}
                        lang={I18NLangs.RU}
                    ></I18N>
                </Typography>
            )}
            <DropdownMenu data-open={open}>
                <nav>
                    <UnstyledList>
                        {otherLinks.map((link) => (
                            <NavigationItem
                                mobile
                                onClick={() => setOpen(false)}
                                key={link.to}
                                {...link}
                            ></NavigationItem>
                        ))}
                    </UnstyledList>
                </nav>
            </DropdownMenu>
        </>
    );
};
