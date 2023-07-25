import { Chip } from "@mui/material";
import { FunctionComponent } from "react";
import { styled } from "styled-components";

export interface CandidateChipsProps {
    className?: string
    chips: string[];
    asAnswerField?: boolean;
    onSelect(chip: string, index: number): void;
}



function cn(...cns: (string | undefined)[]) {
    return cns.join(' ');
}

// .CandidateChips__container > .CandidateChips__item {
//     margin-right: 4px;
//     margin-top: 4px;
// }

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

export function moveChip(
    from: string[],
    setFrom: (items: string[]) => void,
    to: string[],
    setTo: (items: string[]) => void, 
    chip: string,
    index: number
) {
    setFrom([
        ...from.slice(0, index),
        ...from.slice(index + 1)
    ]);
    setTo([...to, chip]);
}


export const Chips: FunctionComponent<CandidateChipsProps> = ({ className, chips, asAnswerField = false, onSelect }) => {    
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