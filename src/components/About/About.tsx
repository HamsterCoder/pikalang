import { styled } from 'styled-components';
import { CircleQuestionMark } from 'lucide-react';

import { Text } from '@components/Text/Text';
import { Fab } from '@components/ui/Fab';
import { Popover } from '@components/ui/Popover';
import { TextLink } from '@components/ui/TextLink';

const Container = styled.div`
    position: fixed;
    bottom: 16px;
    right: 16px;
`;

const AboutLink = styled(TextLink)`
    color: var(--inverted-text-color);
    font-weight: 500;
    text-decoration: none;
`;

const AboutContent = styled.div`
    width: 280px;
`;

export interface AboutProps {
    className?: string;
}

export const About = ({ className }: AboutProps) => {
    return (
        <Container className={className}>
            <Popover
                side="top"
                align="end"
                trigger={
                    <Fab aria-label="about">
                        <CircleQuestionMark size={24} aria-hidden="true" />
                    </Fab>
                }
            >
                <AboutContent>
                    <Text type="primary" color="currentColor">
                        Это pikalang - приложение для изучения языков. Сейчас
                        доступен курс по сербскому языку, новые уроки будут
                        появлятся регулярно.
                    </Text>
                    <Text
                        type="primary"
                        color="currentColor"
                        withMargin={false}
                    >
                        Более поднобную инфу можно найти на{' '}
                        <AboutLink
                            href="https://github.com/HamsterCoder/pikalang"
                            target="_blank"
                        >
                            гитхабе
                        </AboutLink>
                        .
                    </Text>
                </AboutContent>
            </Popover>
        </Container>
    );
};
