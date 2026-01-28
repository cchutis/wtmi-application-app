import { Stack, Typography, Box } from '@mui/material'

export default function StepWelcome() {
    return (
        <Stack spacing={2}>
            <Typography variant="h5">2025 Employment Inquiry</Typography>
            <Box sx={{ whiteSpace: 'pre-line' }}>{`We’re very excited that you’ve come and have an interest in our program!
We’re looking forward to getting to know you, your experience, and seeing how we can work together. We’re going to ask you for a lot of information, we hope you can take the time to finish the form!
* Indicates required question`}</Box>
        </Stack>
    )
}
