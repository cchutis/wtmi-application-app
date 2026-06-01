import { Box, Stack, Typography, LinearProgress } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import AdjustIcon from '@mui/icons-material/Adjust'

export type Chapter = {
    label: string
    /** inclusive step index range */
    start: number
    end: number
}

type Props = {
    chapters: Chapter[]
    activeStep: number
    totalSteps: number
    isReview: boolean
}

export default function ChapterProgress({ chapters, activeStep, totalSteps, isReview }: Props) {
    const effectiveStep = isReview ? totalSteps : activeStep + 1
    const pct = (effectiveStep / totalSteps) * 100

    return (
        <Box>
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    overflowX: 'auto',
                    pb: 1,
                    mx: -0.5,
                    px: 0.5,
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                {chapters.map((c, i) => {
                    const status: 'done' | 'current' | 'todo' =
                        isReview || activeStep > c.end
                            ? 'done'
                            : activeStep >= c.start && activeStep <= c.end
                              ? 'current'
                              : 'todo'

                    const Icon =
                        status === 'done' ? CheckCircleIcon : status === 'current' ? AdjustIcon : RadioButtonUncheckedIcon

                    return (
                        <Stack
                            key={c.label}
                            direction="row"
                            alignItems="center"
                            spacing={0.75}
                            sx={{
                                flex: '0 0 auto',
                                px: 1.25,
                                py: 0.75,
                                borderRadius: 999,
                                bgcolor:
                                    status === 'current'
                                        ? 'rgba(31,59,77,0.08)'
                                        : status === 'done'
                                          ? 'rgba(31,59,77,0.04)'
                                          : 'transparent',
                                border: '1px solid',
                                borderColor:
                                    status === 'current'
                                        ? 'rgba(31,59,77,0.25)'
                                        : status === 'done'
                                          ? 'rgba(31,59,77,0.10)'
                                          : 'rgba(31,59,77,0.10)',
                                color:
                                    status === 'current'
                                        ? 'primary.dark'
                                        : status === 'done'
                                          ? 'primary.main'
                                          : 'text.secondary',
                                transition: 'all 200ms ease',
                            }}
                            aria-current={status === 'current' ? 'step' : undefined}
                        >
                            <Icon sx={{ fontSize: 16 }} />
                            <Typography
                                variant="caption"
                                sx={{
                                    fontWeight: status === 'current' ? 700 : 500,
                                    whiteSpace: 'nowrap',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {String(i + 1).padStart(2, '0')} · {c.label}
                            </Typography>
                        </Stack>
                    )
                })}
            </Stack>
            <Box sx={{ mt: 1.25 }}>
                <LinearProgress variant="determinate" value={pct} sx={{ height: 6, borderRadius: 999 }} />
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.75 }}>
                    <Typography variant="caption" color="text.secondary">
                        {isReview ? 'Review' : `Step ${effectiveStep} of ${totalSteps}`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {Math.round(pct)}% complete
                    </Typography>
                </Stack>
            </Box>
        </Box>
    )
}
