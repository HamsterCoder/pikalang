import { useContext } from 'react';
import { Outlet, useLoaderData } from 'react-router';
import styled from 'styled-components';

import { About } from '@components/About/About';
import { AppHeader } from '@components/AppShell/AppHeader';
import {
    MobileDock,
    MOBILE_DOCK_HEIGHT,
} from '@components/AppShell/MobileDock';
import { SideNav, SIDE_NAV_WIDTH } from '@components/AppShell/SideNav';
import { appNavLinks } from '@components/AppShell/navLinks';
import { EnvContext } from '@routes/EnvContext';

import type { AppLayoutLoaderData } from '@routes/AppLayout.loader';

const Main = styled.div<{ $mobile: boolean }>`
    /* Leaves room for the fixed rail. */
    margin-left: ${({ $mobile }) => ($mobile ? '0' : SIDE_NAV_WIDTH)};
`;

const Container = styled.div<{ $mobile: boolean }>`
    container-type: inline-size;
    container-name: app;

    min-height: 100vh;
    background-color: ${({ theme }) => theme.color.surfaceSunken};

    /* Keeps the last card clear of the bottom dock. */
    padding-bottom: ${({ $mobile }) => ($mobile ? MOBILE_DOCK_HEIGHT : '0')};
`;

/** Lifts the help button above the dock so the two never overlap. */
const RaisedAbout = styled(About)<{ $mobile: boolean }>`
    bottom: ${({ $mobile }) =>
        $mobile ? `calc(${MOBILE_DOCK_HEIGHT} + 16px)` : '16px'};
`;

/**
 * The application shell: a left rail for destinations, a top bar for the
 * learner's own state, and a bottom dock in place of the rail on phones.
 */
export const AppLayout = () => {
    const { userData } = useLoaderData() as AppLayoutLoaderData;
    const { mobile } = useContext(EnvContext);

    return (
        <>
            {!mobile && <SideNav links={appNavLinks} />}
            <Main $mobile={mobile}>
                <AppHeader xp={userData?.xp} />
                <Container $mobile={mobile}>
                    <Outlet />
                    <RaisedAbout $mobile={mobile} />
                </Container>
            </Main>
            {mobile && <MobileDock links={appNavLinks} />}
        </>
    );
};
