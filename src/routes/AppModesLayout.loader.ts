import { UserData, userDataApi } from '@api/user-data';

export interface AppModesLayoutLoaderData {
    userData: UserData;
}

export const loader = async (): Promise<AppModesLayoutLoaderData> => {
    // TODO handle error case, btw how?
    const userData = await userDataApi.getUserData('default');
    return { userData };
};
