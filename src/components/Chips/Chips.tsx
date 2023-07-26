import { Chip } from "@mui/material";
import { FunctionComponent } from "react";
import { styled } from "styled-components";

export interface ChipsProps {
    chips: string[];
    asAnswerField?: boolean;
    onSelect(chip: string, index: number): void;
}

// TODO pass in margin from parent
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

    margin-bottom: 20px;

    &[data-answer=true] {
        min-height: 82px;
        background: linear-gradient(var(--primary-accent) 2px, transparent 2px);
        background-size: 100% 40px;
    }
`;

const Item = styled.span`
    margin-right: 4px;
    margin-top: 4px;
`;

export const Chips: FunctionComponent<ChipsProps> = ({ chips, asAnswerField = false, onSelect }) => {    
    return (
        <Container data-answer={asAnswerField}>
            {chips.map(
                (chip, index) => 
                <Item key={chip + index}>
                    <Chip variant="outlined" onClick={onSelect.bind(null, chip, index)} color="primary" label={chip} />
                </Item>
            )}
        </Container>
    );
};