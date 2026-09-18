import { FunctionComponent } from 'react';

import { translate } from '@components/I18N/dictionary';
import { I18NProps } from '@components/I18N/types';

export const I18N: FunctionComponent<I18NProps> = ({
    textKey,
    lang,
    values,
}) => {
    return <>{translate(lang, textKey, values)}</>;
};
