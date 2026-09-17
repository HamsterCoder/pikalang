import { styled } from 'styled-components';

import { Heading } from '@components/Heading';

/** Heading that truncates with an ellipsis instead of wrapping. */
export const EllipsisHeading = styled(Heading)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
