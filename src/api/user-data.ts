export interface LessonProgress {
    completed: number;
    threshold: number;
}

export interface UserData {
    lessons: Record<string, LessonProgress>;
    xp: number;
}

const DEFAULT_USER_DATA = {
    lessons: {},
    xp: 0,
};

function getUserData(username: string): Promise<UserData> {
    let userData;

    try {
        userData =
            JSON.parse(localStorage.getItem(username) ?? 'null') ??
            DEFAULT_USER_DATA;
    } catch (error) {
        console.log(error);
        return Promise.reject('api.getUserData request failed');
    }

    return Promise.resolve(userData);
}

async function setUserdata(username: string, data: UserData): Promise<void> {
    try {
        localStorage.setItem(username, JSON.stringify(data));
    } catch (error) {
        console.log(error);
        return Promise.reject('api.setUserdata request failed');
    }

    return Promise.resolve();
}

async function saveXPProgress(username: string, xp: number): Promise<void> {
    try {
        const updatedUserData = await userDataApi.getUserData(username);

        // Get one XP for each correct answer
        updatedUserData.xp += xp;

        await userDataApi.setUserdata(username, updatedUserData);
    } catch (error) {
        console.log(error);
        return Promise.reject('api.setUserdata request failed');
    }

    return Promise.resolve();
}

export const userDataApi = {
    getUserData,
    setUserdata,
    saveXPProgress,
};
