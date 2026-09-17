import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { CircleCheck, CircleAlert } from 'lucide-react';

export type AlertSeverity = 'success' | 'error';

export interface AlertProps {
    severity: AlertSeverity;
    title?: ReactNode;
    children?: ReactNode;
    className?: string;
}

const Container = styled.div<{ $severity: AlertSeverity }>`
    display: flex;
    align-items: flex-start;

    padding: 6px 16px;
    border-radius: ${({ theme }) => theme.radius.s};

    color: ${({ theme, $severity }) =>
        $severity === 'success'
            ? theme.color.successText
            : theme.color.errorText};
    background-color: ${({ theme, $severity }) =>
        $severity === 'success'
            ? theme.color.successSurface
            : theme.color.errorSurface};

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    line-height: 1.43;
`;

const Icon = styled.div<{ $severity: AlertSeverity }>`
    display: flex;
    padding: 7px 0;
    margin-right: 12px;

    color: ${({ theme, $severity }) =>
        $severity === 'success' ? theme.color.success : theme.color.error};
`;

const Body = styled.div`
    padding: 8px 0;
    min-width: 0;
`;

const Title = styled.div`
    margin: -2px 0 0.35rem;
    font-size: 1rem;
    font-weight: 500;
`;

export const Alert = ({ severity, title, children, className }: AlertProps) => {
    const StatusIcon = severity === 'success' ? CircleCheck : CircleAlert;

    return (
        <Container role="alert" className={className} $severity={severity}>
            <Icon $severity={severity}>
                <StatusIcon size={22} aria-hidden="true" />
            </Icon>
            <Body>
                {title && <Title>{title}</Title>}
                {children}
            </Body>
        </Container>
    );
};
