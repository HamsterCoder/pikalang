import { Chip } from "@mui/material";
import { FunctionComponent } from "react";

export interface CandidateChipsProps {
    className?: string
    chips: string[];
    onSelect(chip: string): void;
}

import './CandidateChips.css';

function cn(...cns: (string | undefined)[]) {
    return cns.join(' ');
}


export const CandidateChips: FunctionComponent<CandidateChipsProps> = ({ className, chips, onSelect }) => {
    function handleSelect(chip: string) {
        onSelect(chip);
    }
    
    return (
        <div className={cn(className, "CandidateChips__container")}>
            {chips.map(
                chip => <Chip key={chip} className="CandidateChips__item" onClick={handleSelect.bind(null, chip)} color="secondary" label={chip} />
            )}
        </div>
    );
};