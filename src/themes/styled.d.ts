import 'styled-components';

import { Tokens } from '@themes/tokens';

declare module 'styled-components' {
    // The styled-components theme is the token set, so `${({ theme }) => ...}`
    // is typed everywhere.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends Tokens {}
}
