import { emulateLatency } from '@utils/emulateLatency';

/**
 * The learner's own preferences. Like the rest of `@api`, this imitates an
 * async API on top of `localStorage`, so a real one can replace it later.
 *
 * Adding a setting means a field here, a default below, and a row on the
 * settings screen. Everything in between is already written.
 */
export interface Settings {
    /**
     * Let the keyboard answer a lesson: digits to pick a picture, the tile
     * keys in the matching round, Enter to check and move on. Off by default,
     * and off is a real off — the keys do nothing and the badges that
     * advertise them are not drawn, since there is no key to press on the
     * phone most learners are holding.
     */
    hotkeys: boolean;
}

export const defaultSettings: Settings = {
    hotkeys: false,
};

function getLocalStoragePath(username: string) {
    return `${username}/settings`;
}

/**
 * Reads the stored settings, filling in anything a newer version of the app
 * has added since they were written.
 */
export async function getSettings(username: string): Promise<Settings> {
    if (import.meta.env.DEV) {
        await emulateLatency();
    }

    try {
        const stored = JSON.parse(
            localStorage.getItem(getLocalStoragePath(username)) ?? 'null',
        );

        return { ...defaultSettings, ...stored };
    } catch (error) {
        console.log(error);
        // A broken settings blob is not worth failing a screen over.
        return defaultSettings;
    }
}

export async function saveSettings(
    username: string,
    settings: Settings,
): Promise<void> {
    try {
        localStorage.setItem(
            getLocalStoragePath(username),
            JSON.stringify(settings),
        );
    } catch (error) {
        console.log(error);
        return Promise.reject('api.saveSettings request failed');
    }

    return Promise.resolve();
}
