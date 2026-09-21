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
     * Show the keyboard shortcut badges on the matching tiles. Off by default:
     * most learners are on a phone, where there is no key to press.
     */
    showHotkeys: boolean;
}

export const defaultSettings: Settings = {
    showHotkeys: false,
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
