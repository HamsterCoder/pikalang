import { useState } from 'react';
import { styled } from 'styled-components';
import { QuestionMark } from '@mui/icons-material';
import {
    ClickAwayListener,
    Fab,
    Link,
    Tooltip,
    Typography,
} from '@mui/material';

import Text from '@components/Text/Text';

const Container = styled.div`
    position: fixed;
    bottom: 16px;
    right: 16px;
`;

const Popover = styled.div`
    width: 280px;
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
                            <Popover>
                                <Text
                                    sx={{ marginBottom: '1rem' }}
                                    color="currentColor"
                                >
                                    Это pikalang - приложение для изучения
                                    языков. Сейчас доступен курс по сербскому
                                    языку, новые уроки будут появлятся
                                    регулярно.
                                </Text>
                                <Text
                                    sx={{ marginBottom: '1rem' }}
                                    color="currentColor"
                                >
                                    Более поднобную инфу можно найти на{' '}
                                    <Link
                                        href="https://github.com/HamsterCoder/pikalang"
                                        target="_blank"
                                        color="inherit"
                                    >
                                        гитхабе
                                    </Link>
                                    .
                                </Text>
                            </Popover>
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
