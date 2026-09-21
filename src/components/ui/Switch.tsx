import { styled } from 'styled-components';
import { Switch as RadixSwitch } from 'radix-ui';

export interface SwitchProps {
    checked: boolean;
    onCheckedChange(checked: boolean): void;
    disabled?: boolean;
    /** Names the switch for assistive tech when no visible label points at it. */
    'aria-label'?: string;
    /** The id of the label that names it, for `SettingRow` to wire up. */
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    id?: string;
    className?: string;
}

const Track = styled(RadixSwitch.Root)`
    position: relative;
    flex-shrink: 0;

    width: 2.75rem;
    height: 1.6rem;
    padding: 0;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.pill};

    background-color: ${({ theme }) => theme.color.surfaceMuted};
    cursor: pointer;

    transition:
        background-color ${({ theme }) => theme.transition.fast},
        border-color ${({ theme }) => theme.transition.fast};

    &[data-state='checked'] {
        border-color: transparent;
        background-color: ${({ theme }) => theme.color.accent};
    }

    &:disabled {
        cursor: default;
        opacity: 0.5;
    }
`;

const Thumb = styled(RadixSwitch.Thumb)`
    display: block;

    width: 1.2rem;
    height: 1.2rem;
    border-radius: ${({ theme }) => theme.radius.circle};

    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.subtle};

    transform: translateX(0.2rem);
    transition: transform ${({ theme }) => theme.transition.fast};
    will-change: transform;

    &[data-state='checked'] {
        transform: translateX(1.35rem);
    }
`;

/**
 * An on/off control for a single preference. It carries no label of its own —
 * `SettingRow` supplies the name and the explanation beside it.
 */
export const Switch = ({
    checked,
    onCheckedChange,
    disabled,
    id,
    className,
    ...aria
}: SwitchProps) => {
    return (
        <Track
            id={id}
            className={className}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            {...aria}
        >
            <Thumb />
        </Track>
    );
};
