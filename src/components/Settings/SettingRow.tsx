import { ReactNode, useId } from 'react';
import { styled } from 'styled-components';

export interface SettingRowProps {
    label: ReactNode;
    /** What turning it on actually does. */
    description?: ReactNode;
    /**
     * The control, given the ids that tie it to the label and the description
     * so the row reads as one thing to a screen reader.
     */
    children(ids: { labelId: string; descriptionId?: string }): ReactNode;
    className?: string;
}

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    padding: 0.9rem 1rem;
`;

const Body = styled.div`
    flex: 1 1 auto;
    min-width: 0;
`;

const Label = styled.span`
    display: block;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    font-weight: 500;
    color: ${({ theme }) => theme.color.text};
`;

const Description = styled.span`
    display: block;
    margin-top: 0.15rem;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    line-height: 1.4;
    color: ${({ theme }) => theme.color.hint};
`;

/**
 * One setting: what it is called, what it does, and the control that changes
 * it. The control is a render prop so the row can hand it the ids it needs —
 * a switch has no visible label of its own to be named by.
 */
export const SettingRow = ({
    label,
    description,
    children,
    className,
}: SettingRowProps) => {
    const labelId = useId();
    const descriptionId = useId();

    return (
        <Row className={className}>
            <Body>
                <Label id={labelId}>{label}</Label>
                {description && (
                    <Description id={descriptionId}>{description}</Description>
                )}
            </Body>
            {children({
                labelId,
                descriptionId: description ? descriptionId : undefined,
            })}
        </Row>
    );
};
