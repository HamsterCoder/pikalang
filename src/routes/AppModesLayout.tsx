import { About } from '@components/About/About';
import { Header } from '@components/Header/Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

import { UserData, userDataApi } from '@api/user-data';

interface AppModesLayoutLoaderData {
    userData: UserData;
}

export const loader = async (): Promise<AppModesLayoutLoaderData> => {
    // TODO handle error case, btw how?
    const userData = await userDataApi.getUserData('default');
    return { userData };
};

const Container = styled.div`
    container-type: inline-size;
    container-name: app;
`;

export const AppModesLayout = function () {
    const { userData } = useLoaderData() as AppModesLayoutLoaderData;

    return (
        <>
            <Header xp={userData?.xp}></Header>
            <Container>
                <Outlet />
                <About />
            </Container>
        </>
    );
};
