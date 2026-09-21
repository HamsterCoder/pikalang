import { createContext } from 'react';

import { defaultSettings, type Settings } from '@api/settings';

export interface SettingsContextValue {
    settings: Settings;
    /** Changes one setting and writes it straight through to storage. */
    setSetting<Key extends keyof Settings>(
        key: Key,
        value: Settings[Key],
    ): void;
}

/**
 * The learner's preferences, provided once by `App` so any screen can read
 * them without threading props through the tree.
 */
export const SettingsContext = createContext<SettingsContextValue>({
    settings: defaultSettings,
    setSetting: () => {},
});
