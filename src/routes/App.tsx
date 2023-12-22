import { styled } from 'styled-components';
import { Outlet, useLoaderData } from 'react-router-dom';

import { UserData, userDataApi } from '@api/user-data';
import { Header } from '@components/Header/Header';
import { About } from '@components/About/About';

const Container = styled.div`
    container-type: inline-size;
    container-name: app;
`;

interface AppLoaderData {
    userData: UserData;
}

export const loader = async (): Promise<AppLoaderData> => {
    // TODO handle error case, btw how?
    const userData = await userDataApi.getUserData('default');
    return { userData };
};

export const App = () => {
    const { userData } = useLoaderData() as AppLoaderData;

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
