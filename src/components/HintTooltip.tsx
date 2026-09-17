import { IconButton, Tooltip } from '@mui/material';
import { HelpOutline as HelpOutlineIcon } from '@mui/icons-material';

export interface HintTooltipProps {
    text: string;
}

export const HintTooltip = function ({ text }: HintTooltipProps) {
    return (
        <Tooltip
            title={text}
            enterTouchDelay={0}
            enterDelay={100}
            leaveDelay={100}
            arrow
        >
            <IconButton aria-label="hint" color="inherit">
                <HelpOutlineIcon color="inherit" />
            </IconButton>
        </Tooltip>
    );
};
