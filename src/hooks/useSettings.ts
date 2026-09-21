import { useContext } from 'react';

import { SettingsContext } from '@routes/SettingsContext';
import type { SettingsContextValue } from '@routes/SettingsContext';

/** The learner's preferences, as provided by `App`. */
export function useSettings(): SettingsContextValue {
    return useContext(SettingsContext);
}
