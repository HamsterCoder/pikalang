import { IconButton, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export interface HintTooltipProps {
    text: string;
}

export const HintTooltip = function ({ text }: HintTooltipProps) {
    return (
        <Tooltip title={text} arrow>
            <IconButton aria-label="hint" color="inherit">
                <HelpOutlineIcon color="inherit" />
            </IconButton>
        </Tooltip>
    );
};
