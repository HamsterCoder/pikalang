// TODO add code that would emulate a 50ms - 300ms wait time for methods
export interface DialogProgress {
    completed: boolean;
}

export interface DialogDescription extends DialogProgress {
    id: string;
    name: string;
    displayName: string;
}

const dialogDescriptions = [
    {
        id: '1',
        name: "Let's introduce ourselves",
        displayName: 'Давайте познакомимся',
    },
    {
        id: '2',
        name: 'At the market',
        displayName: 'На рынке',
    },
];

function getLocalStoragePath(username: string) {
    return `${username}/dialogs_progress`;
}

function getDialogs(username: string): Promise<DialogDescription[]> {
    let dialogs: DialogDescription[];
    let progressData: Record<string, DialogProgress> | null;

    try {
        progressData = JSON.parse(
            localStorage.getItem(getLocalStoragePath(username)) ?? 'null',
        );

        dialogs = dialogDescriptions.map((dialog) => {
            return {
                ...dialog,
                completed: progressData?.[dialog.id]?.completed ?? false,
            };
        });
    } catch (error) {
        console.log(error);
        return Promise.reject('api.getDialogs request failed');
    }

    return Promise.resolve(dialogs);
}

async function markDialogAsCompleted(
    username: string,
    id: string,
): Promise<void> {
    let progressData: Record<string, DialogProgress>;

    try {
        progressData =
            JSON.parse(
                localStorage.getItem(getLocalStoragePath(username)) ?? 'null',
            ) ?? {};
        progressData[id] = { completed: true };

        localStorage.setItem(
            getLocalStoragePath(username),
            JSON.stringify(progressData),
        );
    } catch (error) {
        console.log(error);
        return Promise.reject('api.markDialogAsCompleted request failed');
    }

    return Promise.resolve();
}

export const api = {
    getDialogs,
    markDialogAsCompleted,
};
