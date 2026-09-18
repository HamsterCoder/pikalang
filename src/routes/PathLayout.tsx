import { useContext } from 'react';
import { Outlet, useLoaderData } from 'react-router';
import styled from 'styled-components';

import { About } from '@components/About/About';
import { AppHeader } from '@components/AppHeader/AppHeader';
import { MOBILE_DOCK_HEIGHT } from '@components/AppHeader/MobileDock';
import { EnvContext } from '@routes/EnvContext';

import type { AppModesLayoutLoaderData } from '@routes/AppModesLayout.loader';

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
 * Layout for the redesigned screens: the new `AppHeader` instead of the
 * accent-coloured `Header`. Kept separate from `AppModesLayout` so the current
 * design stays reachable side by side while we pick between them.
 */
export const PathLayout = () => {
    const { userData } = useLoaderData() as AppModesLayoutLoaderData;
    const { mobile } = useContext(EnvContext);

    return (
        <>
            <AppHeader xp={userData?.xp} />
            <Container $mobile={mobile}>
                <Outlet />
                <RaisedAbout $mobile={mobile} />
            </Container>
        </>
    );
};
