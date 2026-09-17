import { styled } from 'styled-components';

export const Card = styled.div`
    display: flex;
    flex-direction: column;

    border-radius: ${({ theme }) => theme.radius.s};
    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.card};
    color: ${({ theme }) => theme.color.text};
    overflow: hidden;
`;

export const CardContent = styled.div`
    flex-grow: 1;
    padding: 16px;
`;

export const CardActions = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: 8px;
`;
