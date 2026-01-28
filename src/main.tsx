import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes } from '@mui/material'
import App from './App'

let theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
    },
    components: {
        MuiButton: {
            defaultProps: { size: 'large' },
            styleOverrides: {
                root: { minHeight: 48, borderRadius: 10 },
            },
        },
        MuiTextField: {
            defaultProps: { fullWidth: true, variant: 'outlined' },
        },
        MuiFormControl: {
            defaultProps: { fullWidth: true },
        },
        MuiContainer: {
            defaultProps: { maxWidth: 'sm' },
        },
    },
})

theme = responsiveFontSizes(theme)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
)
