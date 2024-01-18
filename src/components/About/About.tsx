import { useState } from 'react';
import { styled } from 'styled-components';
import { QuestionMark } from '@mui/icons-material';
import { ClickAwayListener, Fab, Link, Tooltip } from '@mui/material';

import { Text } from '@components/Text/Text';

const Container = styled.div`
    position: fixed;
    bottom: 16px;
    right: 16px;
`;

const TooltipLink = styled(Link)``;

const TooltipContent = styled.div`
    width: 280px;

    ${TooltipLink} {
        color: var(--inverted-text-color);
        font-weight: 500;
        text-decoration: none;
    }
`;

export const About = () => {
    const [open, setOpen] = useState(false);

    const closeTooltip = () => {
        setOpen(false);
    };

    const toggleTooltip = () => {
        setOpen(!open);
    };

    return (
        <Container>
            <ClickAwayListener onClickAway={closeTooltip}>
                <div>
                    <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={closeTooltip}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        placement="top-end"
                        title={
                            <TooltipContent>
                                <Text type="primary" color="currentColor">
                                    Это pikalang - приложение для изучения
                                    языков. Сейчас доступен курс по сербскому
                                    языку, новые уроки будут появлятся
                                    регулярно.
                                </Text>
                                <Text
                                    type="primary"
                                    color="currentColor"
                                    withMargin={false}
                                >
                                    Более поднобную инфу можно найти на{' '}
                                    <TooltipLink
                                        href="https://github.com/HamsterCoder/pikalang"
                                        target="_blank"
                                    >
                                        гитхабе
                                    </TooltipLink>
                                    .
                                </Text>
                            </TooltipContent>
                        }
                    >
                        <Fab
                            onClick={toggleTooltip}
                            color="primary"
                            size="medium"
                            aria-label="about"
                        >
                            <QuestionMark />
                        </Fab>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </Container>
    );
};
