import { Box, Button } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import CheckIcon from '@mui/icons-material/Check'

type Props = {
    activeStep: number
    stepsCount: number
    onBack: () => void
    onNext: () => void
    onFinish: () => void
    disableNext?: boolean
}

export default function StepActions({ activeStep, stepsCount, onBack, onNext, onFinish, disableNext }: Props) {
    const isLast = activeStep === stepsCount - 1
    return (
        <Box display="flex" gap={2} justifyContent="space-between" mt={3}>
            <Button onClick={onBack} disabled={activeStep === 0} startIcon={<NavigateBeforeIcon />}>
                Back
            </Button>
            {isLast ? (
                <Button variant="contained" color="primary" onClick={onFinish} endIcon={<CheckIcon />}>
                    Finish
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={onNext} endIcon={<NavigateNextIcon />} disabled={disableNext}>
                    Next
                </Button>
            )}
        </Box>
    )
}
