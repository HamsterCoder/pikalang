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

const DEFAULT_LESSON_DATA = {
  completed: 0,
  threshold: 4,
};

function getUserData(username: string): Promise<UserData> {
  let userData;

  try {
    userData =
      JSON.parse(localStorage.getItem(username) ?? "null") ?? DEFAULT_USER_DATA;
  } catch (error) {
    console.log(error);
    return Promise.reject("api.getUserData request failed");
  }

  return Promise.resolve(userData);
}

async function setUserdata(username: string, data: UserData): Promise<void> {
  try {
    localStorage.setItem(username, JSON.stringify(data));
  } catch (error) {
    console.log(error);
    return Promise.reject("api.setUserdata request failed");
  }

  return Promise.resolve();
}

async function saveLessonProgress(
  username: string,
  id: string,
  xp: number,
): Promise<void> {
  try {
    let updatedUserData = await userDataApi.getUserData(username);

    // Get one XP for each correct answer
    updatedUserData.xp += xp;
    updatedUserData.lessons[id] =
      updatedUserData.lessons[id] || DEFAULT_LESSON_DATA;
    updatedUserData.lessons[id].completed += 1;

    await userDataApi.setUserdata(username, updatedUserData);
  } catch (error) {
    console.log(error);
    return Promise.reject("api.setUserdata request failed");
  }

  return Promise.resolve();
}

export const userDataApi = {
  getUserData,
  setUserdata,
  saveLessonProgress,
};
