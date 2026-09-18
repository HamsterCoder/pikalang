import { UserData, userDataApi } from '@api/user-data';

export interface AppLayoutLoaderData {
    userData: UserData;
}

export const loader = async (): Promise<AppLayoutLoaderData> => {
    // TODO handle error case, btw how?
    const userData = await userDataApi.getUserData('default');
    return { userData };
};
