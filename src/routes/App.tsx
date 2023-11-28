import { FunctionComponent } from 'react';
import { styled } from 'styled-components';
import { Outlet, useLoaderData } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { UserData, userDataApi } from '@api/user-data';
import { About } from '@components/About/About';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

interface AppLoaderData {
    userData: UserData;
}

export const loader = async (): Promise<AppLoaderData> => {
    // TODO handle error case, btw how?
    const userData = await userDataApi.getUserData('default');
    return { userData };
};

export const App: FunctionComponent = () => {
    const { userData } = useLoaderData() as AppLoaderData;

    return (
        <div>
            <Header xp={userData?.xp}></Header>
            <Container>
                <Outlet />
                <About />
            </Container>
        </div>
    );
};
