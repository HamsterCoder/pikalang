import { useState } from 'react';
import { CircleHelp } from 'lucide-react';

import { IconButton } from '@components/ui/IconButton';
import { Tooltip } from '@components/ui/Tooltip';

export interface HintTooltipProps {
    text: string;
}

export const HintTooltip = function ({ text }: HintTooltipProps) {
    // Tooltips open on hover and focus only, so tapping the button toggles it
    // for touch devices.
    const [open, setOpen] = useState(false);

    return (
        <Tooltip title={text} open={open} onOpenChange={setOpen}>
            <IconButton aria-label="hint" onClick={() => setOpen(!open)}>
                <CircleHelp size={24} aria-hidden="true" />
            </IconButton>
        </Tooltip>
    );
};
