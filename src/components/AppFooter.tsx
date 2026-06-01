import { Box, Container, Stack, Typography, Divider } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function AppFooter() {
    return (
        <Box component="footer" sx={{ mt: 6, pb: 4 }}>
            <Container maxWidth="md">
                <Divider sx={{ mb: 3 }} />
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                >
                    <Stack spacing={0.5}>
                        <Typography variant="subtitle2" sx={{ fontFamily: '"Fraunces", Georgia, serif' }}>
                            Witness to Mass Incarceration
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Documenting stories. Building futures.
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ color: 'text.secondary' }}>
                        <Stack direction="row" spacing={0.75} alignItems="center">
                            <LockOutlinedIcon sx={{ fontSize: 16 }} />
                            <Typography variant="caption">Your responses are saved locally</Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.75} alignItems="center">
                            <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                            <Typography variant="caption">Thank you for sharing</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}
