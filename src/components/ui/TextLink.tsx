import { styled } from 'styled-components';

/** Anchor styled for running text; colour is inherited so it works on any surface. */
export const TextLink = styled.a`
    color: ${({ theme }) => theme.color.accent};
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
        text-decoration: none;
    }
`;
