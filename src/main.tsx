import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes } from '@mui/material'
import App from './App'

const SERIF = '"Fraunces", "Iowan Old Style", Georgia, serif'
const SANS = '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

let theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1f3b4d', dark: '#13283a', light: '#3e5f76', contrastText: '#fffaf2' },
        secondary: { main: '#c8553d', dark: '#a23f2c', light: '#e07a64', contrastText: '#fffaf2' },
        background: { default: '#f5f1ea', paper: '#ffffff' },
        text: { primary: '#1c2630', secondary: '#566370' },
        divider: 'rgba(31,59,77,0.12)',
    },
    shape: { borderRadius: 14 },
    typography: {
        fontFamily: SANS,
        h1: { fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.02em' },
        h2: { fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.02em' },
        h3: { fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.01em' },
        h4: { fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.01em' },
        h5: { fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.005em' },
        h6: { fontFamily: SERIF, fontWeight: 600 },
        button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
        body1: { lineHeight: 1.65 },
        body2: { lineHeight: 1.6 },
        overline: { letterSpacing: '0.18em', fontWeight: 600 },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: { fontFamily: SANS, color: '#1c2630' },
                '::selection': { background: 'rgba(200,85,61,0.25)' },
            },
        },
        MuiButton: {
            defaultProps: { size: 'large', disableElevation: true },
            styleOverrides: {
                root: { minHeight: 48, borderRadius: 999, paddingInline: 22 },
                containedPrimary: {
                    boxShadow: '0 6px 20px -8px rgba(31,59,77,0.45)',
                    '&:hover': { boxShadow: '0 10px 24px -8px rgba(31,59,77,0.55)' },
                },
            },
        },
        MuiTextField: {
            defaultProps: { fullWidth: true, variant: 'outlined' },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: '#fdfbf7',
                    transition: 'box-shadow 200ms ease, background-color 200ms ease',
                    '&:hover': { backgroundColor: '#fff' },
                    '&.Mui-focused': {
                        backgroundColor: '#fff',
                        boxShadow: '0 0 0 4px rgba(31,59,77,0.10)',
                    },
                },
            },
        },
        MuiFormControl: { defaultProps: { fullWidth: true } },
        MuiPaper: {
            styleOverrides: {
                root: { backgroundImage: 'none' },
                rounded: { borderRadius: 18 },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'linear-gradient(135deg, #13283a 0%, #1f3b4d 60%, #2c526d 100%)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: { backgroundColor: 'rgba(31,59,77,0.10)' },
                bar: { borderRadius: 999 },
            },
        },
        MuiDivider: {
            styleOverrides: { root: { borderColor: 'rgba(31,59,77,0.10)' } },
        },
        MuiChip: {
            styleOverrides: {
                root: { fontWeight: 500 },
            },
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
