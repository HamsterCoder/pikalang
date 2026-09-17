import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { Popover as RadixPopover } from 'radix-ui';

export interface PopoverProps {
    trigger: ReactNode;
    children: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}

const Content = styled(RadixPopover.Content)`
    max-width: 320px;
    padding: 0.75rem 1rem;
    border-radius: ${({ theme }) => theme.radius.s};

    color: ${({ theme }) => theme.color.textInverted};
    background-color: ${({ theme }) => theme.color.overlay};

    font-family: ${({ theme }) => theme.font.base};

    z-index: 10;
`;

const Arrow = styled(RadixPopover.Arrow)`
    fill: ${({ theme }) => theme.color.overlay};
`;

/**
 * Click-triggered panel. Radix handles outside clicks, Escape and focus, which
 * is what the ClickAwayListener wrapper used to do by hand.
 */
export const Popover = ({
    trigger,
    children,
    side = 'top',
    align = 'end',
}: PopoverProps) => {
    return (
        <RadixPopover.Root>
            <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
            <RadixPopover.Portal>
                <Content side={side} align={align} sideOffset={8}>
                    {children}
                    <Arrow width={11} height={5} />
                </Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    );
};
