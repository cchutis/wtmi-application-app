import { Stack, Typography, Button } from '@mui/material'

type IntroProps = {
    onStart: () => void
}

export default function Intro({ onStart }: IntroProps) {
    return (
        <Stack spacing={3} alignItems="stretch">
            <Typography variant="h4" component="h1" gutterBottom>
                Witness to Mass Incarceration Application Form
            </Typography>

            <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut augue et arcu tincidunt fermentum. Nulla facilisi. Maecenas sit amet lorem at turpis dapibus porta. Nunc non bibendum libero. Suspendisse congue, quam id porttitor efficitur, enim nunc egestas mauris, et venenatis
                massa urna vitae leo.
            </Typography>

            <Typography variant="body1">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</Typography>

            <Button variant="contained" color="primary" size="large" onClick={onStart} sx={{ alignSelf: 'center', px: 4 }}>
                Let's get started
            </Button>
        </Stack>
    )
}
