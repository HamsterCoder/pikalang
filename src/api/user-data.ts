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
    xp: 0
};

function getUserData(username: string): UserData {
    try {
        return JSON.parse(localStorage.getItem(username) ?? 'null') ?? DEFAULT_USER_DATA;
    } catch (error) {
        console.log(error);
        throw new Error('api.getUserData request failed');
    }
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

export const userDataApi = {
    getUserData,
    setUserdata
};