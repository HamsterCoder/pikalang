import styled from 'styled-components';

export const CardList = styled.ul`
    /* Style resets */
    margin: 0;
    padding: 0;
    display: grid;

    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    align-items: stretch;
    padding: 0 2rem;

    @container app (max-width: 1260px) {
        & {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @container app (max-width: 840px) {
        & {
            grid-template-columns: 1fr 1fr;
        }
    }

    @container app (max-width: 420px) {
        & {
            grid-template-columns: 1fr;
        }
    }
`;

export const CardListItem = styled.li`
    /* Style resets */
    margin: 0;
    padding: 0;
    list-style-type: none;

    min-width: 0;
`;
