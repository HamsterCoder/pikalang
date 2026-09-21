import { ReactNode } from 'react';
import { styled } from 'styled-components';

import { Heading } from '@components/Heading';

export interface SettingsSectionProps {
    title: ReactNode;
    /** What this group of settings is for, when the title is not enough. */
    description?: ReactNode;
    children: ReactNode;
    className?: string;
}

const Section = styled.section`
    & + & {
        margin-top: 1.5rem;
    }
`;

const Head = styled.div`
    margin-bottom: 0.75rem;
`;

const Description = styled.p`
    margin: 0.15rem 0 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    color: ${({ theme }) => theme.color.hint};
`;

/** The rows sit in one panel, divided rather than boxed one by one. */
const Rows = styled.div`
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.l};

    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.subtle};
    overflow: hidden;

    & > * + * {
        border-top: 1px solid ${({ theme }) => theme.color.border};
    }
`;

/**
 * One group of related settings. Adding a group is adding one of these with
 * its rows inside; nothing else on the screen has to know about it.
 */
export const SettingsSection = ({
    title,
    description,
    children,
    className,
}: SettingsSectionProps) => {
    return (
        <Section className={className}>
            <Head>
                <Heading size="s" color="default">
                    {title}
                </Heading>
                {description && <Description>{description}</Description>}
            </Head>
            <Rows>{children}</Rows>
        </Section>
    );
};
