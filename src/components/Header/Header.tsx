import { styled } from 'styled-components';

import { DesktopNavigation } from '@components/Navigation/DesktopNavigation';
import { MobileNavigation } from '@components/Navigation/MobileNavigation';
import { Xp } from '@components/Xp';
import { BaseHeader, HeaderContainer } from '@components/Header/Header.styles';

const DesktopLayout = styled(BaseHeader)`
    display: flex;

    @container header (max-width: 840px) {
        display: none;
    }

    & > .xp {
        margin-left: auto;
    }
`;

const MobileLayout = styled(BaseHeader)`
    display: none;

    @container header (max-width: 840px) {
        display: flex;
    }

    & > .xp {
        margin-left: auto;
    }
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

    // XXX with this approach both layouts are rendered simultaneously
    // Hard to inspect, and twice the amount of work for the browser

    // TODO add an underlay for clickout close handling

    return (
        <HeaderContainer>
            <DesktopLayout>
                <DesktopNavigation links={pages} />
                <Xp className="xp" xp={xp} />
            </DesktopLayout>
            <MobileLayout>
                <MobileNavigation links={pages}></MobileNavigation>
                <Xp className="xp" xp={xp} mobile />
            </MobileLayout>
        </HeaderContainer>
    );
};
