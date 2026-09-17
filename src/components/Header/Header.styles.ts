import { styled } from 'styled-components';

export const BaseHeader = styled.div`
    display: flex;
    align-items: center;

    background-color: var(--primary-accent);
    color: var(--inverted-text-color);

    padding: 1rem 2rem;
`;

export const HeaderContainer = styled.div`
    position: relative;
    z-index: 5;
    container-name: header;
    container-type: inline-size;
    margin-bottom: 1rem;
`;
