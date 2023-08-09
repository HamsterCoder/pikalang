import { Chip } from "@mui/material";
import { FunctionComponent } from "react";
import { styled } from "styled-components";

interface ExternalStyles {
    marginBottom?: string;
}

export interface ChipsProps {
    chips: string[];
    asAnswerField?: boolean;
    onSelect(chip: string, index: number): void;
    styles?: ExternalStyles 
}

const Container = styled.div<ExternalStyles>`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    min-height: 36px;

    margin-bottom: ${props => (props.marginBottom ?? '20px')};

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

export const Chips: FunctionComponent<ChipsProps> = ({ chips, styles, asAnswerField = false, onSelect }) => {    
    return (
        <Container {...styles} data-answer={asAnswerField}>
            {chips.map(
                (chip, index) => 
                <Item key={chip + index}>
                    <Chip variant="outlined" onClick={onSelect.bind(null, chip, index)} color="primary" label={chip} />
                </Item>
            )}
        </Container>
    );
};