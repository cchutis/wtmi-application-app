import { Stack, Typography } from '@mui/material'

export default function StepReview({ values }: { values: unknown }) {
    return (
        <Stack spacing={2}>
            <Typography variant="h6">Review & Submit</Typography>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(values, null, 2)}</pre>
        </Stack>
    )
}
