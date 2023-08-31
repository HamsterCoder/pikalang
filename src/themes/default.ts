import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        text: {
            primary: '#54196a',
        },
        primary: {
            main: '#AA66CC',
        },
        secondary: {
            main: '#33B5E5',
        },
        success: {
            main: '#99CC00',
        },
        error: {
            main: '#FF4444',
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
    },
});
