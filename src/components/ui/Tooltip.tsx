import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { Tooltip as RadixTooltip } from 'radix-ui';

export interface TooltipProps {
    title: ReactNode;
    children: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Tooltips do not open on touch, so the trigger toggles it on tap too. */
    open?: boolean;
    onOpenChange?(open: boolean): void;
}

const Content = styled(RadixTooltip.Content)`
    max-width: 300px;
    padding: 4px 8px;
    border-radius: ${({ theme }) => theme.radius.s};

    color: ${({ theme }) => theme.color.textInverted};
    background-color: ${({ theme }) => theme.color.overlay};

    font-family: ${({ theme }) => theme.font.base};
    font-size: 0.6875rem;
    font-weight: 500;
    line-height: 1.4;

    user-select: none;
    z-index: 10;
`;

const Arrow = styled(RadixTooltip.Arrow)`
    fill: ${({ theme }) => theme.color.overlay};
`;

/**
 * Hover/focus tooltip. `Tooltip.Provider` lives in the app root so that
 * consecutive tooltips share the open delay.
 */
export const Tooltip = ({
    title,
    children,
    side = 'top',
    open,
    onOpenChange,
}: TooltipProps) => {
    return (
        <RadixTooltip.Root
            delayDuration={100}
            open={open}
            onOpenChange={onOpenChange}
        >
            <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
            <RadixTooltip.Portal>
                <Content side={side} sideOffset={4}>
                    {title}
                    <Arrow width={11} height={5} />
                </Content>
            </RadixTooltip.Portal>
        </RadixTooltip.Root>
    );
};

export const TooltipProvider = RadixTooltip.Provider;
