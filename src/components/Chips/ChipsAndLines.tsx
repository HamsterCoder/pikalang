import { FunctionComponent, useState } from 'react';

import { Chips } from './Chips';

export interface CandidateChipsProps {
    chips: string[];
    onChange(chips: string[]): void;
}

//@ts-ignore
function removeChip(chips: string[], chip: string, index: number) {
    return [...chips.slice(0, index), ...chips.slice(index + 1)];
}

function addChip(chips: string[], chip: string) {
    return [...chips, chip];
}

export const ChipsAndLines: FunctionComponent<CandidateChipsProps> = ({
    chips,
    onChange,
}) => {
    const [fromChips, setFromChips] = useState<string[]>(chips);
    const [toChips, setToChips] = useState<string[]>([]);

    function onChipSelect(chip: string, index: number) {
        setFromChips(removeChip(fromChips, chip, index));

        const updatedToChips = addChip(toChips, chip);
        setToChips(updatedToChips);
        onChange(updatedToChips);
    }

    function onChipDeselect(chip: string, index: number) {
        setFromChips(addChip(fromChips, chip));

        const updatedToChips = removeChip(toChips, chip, index);
        setToChips(updatedToChips);
        onChange(updatedToChips);
    }

    return (
        <>
            <Chips chips={toChips} asAnswerField onSelect={onChipDeselect} />

            <Chips chips={fromChips} onSelect={onChipSelect} />
        </>
    );
};
