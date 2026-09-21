import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { defaultSettings, getSettings, saveSettings } from '@api/settings';
import type { Settings } from '@api/settings';
import type { SettingsContextValue } from '@routes/SettingsContext';

/**
 * Loads the settings once and hands back the value `App` provides. Screens
 * read it through `useSettings`; this is only for the one place that owns it.
 *
 * The defaults are in place from the first render, so nothing has to wait on
 * storage to draw itself.
 */
export function useSettingsState(): SettingsContextValue {
    const [settings, setSettings] = useState<Settings>(defaultSettings);
    /**
     * The value to write from, so a change never builds on the state a stale
     * closure happens to be holding.
     */
    const current = useRef<Settings>(defaultSettings);

    useEffect(() => {
        let live = true;

        void getSettings('default').then((stored) => {
            if (!live) {
                return;
            }

            current.current = stored;
            setSettings(stored);
        });

        return () => {
            live = false;
        };
    }, []);

    const setSetting = useCallback<SettingsContextValue['setSetting']>(
        (key, value) => {
            const next = { ...current.current, [key]: value };

            current.current = next;
            setSettings(next);
            void saveSettings('default', next);
        },
        [],
    );

    return useMemo(() => ({ settings, setSetting }), [settings, setSetting]);
}
