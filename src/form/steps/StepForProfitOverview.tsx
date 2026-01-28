import { Stack, Typography, Box } from '@mui/material'

export default function StepForProfitOverview() {
    return (
        <Stack spacing={2}>
            <Typography variant="h6">What are you hoping to do in the future? For-Profit Section</Typography>
            <Box sx={{ whiteSpace: 'pre-line' }}>
                {`This section will help us to determine what direction we should lead you into. Because we are looking to help close to 1000 people, we have a broad range of job possibilities. You will be marking only those areas that you want to work in.
The following is a list of 22 main for-profit opportunities, and within those categories, there are about 375 possible job listings. Please look carefully at the main categories. Please check one of the main opportunities that you would be interested in, and within that main opportunity, please check up to three areas that appeal to you.`}
            </Box>
        </Stack>
    )
}
