import { AppBar, Toolbar, Typography, Box, Stack, Chip } from '@mui/material'
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined'

export default function AppHeader() {
    return (
        <AppBar position="sticky" elevation={0} color="primary">
            <Toolbar sx={{ py: 1.25, gap: 2 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.10)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'common.white',
                    }}
                >
                    <GavelOutlinedIcon fontSize="small" />
                </Box>
                <Stack sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        variant="overline"
                        sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.2, fontSize: 11 }}
                    >
                        Witness to Mass Incarceration
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ color: 'common.white', lineHeight: 1.2, fontFamily: '"Fraunces", Georgia, serif' }}
                    >
                        Employment Inquiry
                    </Typography>
                </Stack>
                <Chip
                    label="Autosaved"
                    size="small"
                    sx={{
                        display: { xs: 'none', sm: 'inline-flex' },
                        bgcolor: 'rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.85)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        '& .MuiChip-label': { px: 1.25 },
                    }}
                />
            </Toolbar>
        </AppBar>
    )
}
