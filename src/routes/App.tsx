import { FunctionComponent } from 'react';
import { styled } from 'styled-components';

import { Header } from '@components/Header/Header';
import { UserData, userDataApi } from '@api/user-data';
import { About } from '@components/About/About';
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

// TODO need to type userData correctly

export const appLoader = async () => {
    const userData = await userDataApi.getUserData('default');
    return { userData };
};

export const App: FunctionComponent = () => {
    const { userData } = useLoaderData();

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
