import { Chip } from "@mui/material";
import { FunctionComponent } from "react";

export interface CandidateChipsProps {
    className?: string
    chips: string[];
    asAnswerField?: boolean;
    onSelect(chip: string): void;
}

import './CandidateChips.css';

function cn(...cns: (string | undefined)[]) {
    return cns.join(' ');
}


export const CandidateChips: FunctionComponent<CandidateChipsProps> = ({ className, chips, asAnswerField = false, onSelect }) => {
    function handleSelect(chip: string) {
        onSelect(chip);
    }
    
    return (
        <div className={cn(className, "CandidateChips__container", asAnswerField ?"CandidateChips__container_answer" : undefined)}>
            {chips.map(
                chip => <Chip key={chip} className="CandidateChips__item" variant="outlined" onClick={handleSelect.bind(null, chip)} color="primary" label={chip} />
            )}
        </div>
    );
};