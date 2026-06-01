import { useEffect, useMemo, useState } from 'react'
import { Container, Paper, Box, Typography, Stack, Button } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { FormProvider, useForm } from 'react-hook-form'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import ChapterProgress, { Chapter } from './components/ChapterProgress'
import StepWelcome from './form/steps/StepWelcome'
import StepContact from './form/steps/StepContact'
import StepAddress from './form/steps/StepAddress'
import StepDemographics from './form/steps/StepDemographics'
import StepEducationContact from './form/steps/StepEducationContact'
import StepJob1 from './form/steps/StepJob1'
import StepJob2 from './form/steps/StepJob2'
import StepJob3 from './form/steps/StepJob3'
import StepForProfitOverview from './form/steps/StepForProfitOverview'
import StepForProfitMain from './form/steps/StepForProfitMain'
import StepForProfitAreas from './form/steps/StepForProfitAreas'
import StepNonProfitOverview from './form/steps/StepNonProfitOverview'
import StepNonProfitMain from './form/steps/StepNonProfitMain'
import StepNonProfitAreas from './form/steps/StepNonProfitAreas'
import StepWorkingPreferences from './form/steps/StepWorkingPreferences'
import StepWorkTypeAvailability from './form/steps/StepWorkTypeAvailability'
import StepRestrictions from './form/steps/StepRestrictions'
import StepActions from './components/StepActions'
import { defaultValues, FormValues } from './types'
import { loadState, saveState, clearState } from './utils/storage'

function useAutosave<T>(data: T, delay = 400) {
    useEffect(() => {
        const handle = setTimeout(() => saveState(data), delay)
        return () => clearTimeout(handle)
    }, [data, delay])
}

export default function App() {
    const saved = loadState<FormValues>()
    const methods = useForm<FormValues>({ defaultValues: saved ?? defaultValues, mode: 'onChange' })
    const { handleSubmit, trigger, formState, watch } = methods
    const values = watch()

    useAutosave(values)

    const steps = useMemo(
        () => [
            { label: 'Welcome', content: <StepWelcome /> },
            { label: 'Contact Information', content: <StepContact /> },
            { label: 'Address Information', content: <StepAddress /> },
            { label: 'Demographic Questions', content: <StepDemographics /> },
            { label: 'Education & Contact Preference', content: <StepEducationContact /> },
            { label: 'Work History - Job 1', content: <StepJob1 /> },
            { label: 'Work History - Job 2', content: <StepJob2 /> },
            { label: 'Work History - Job 3', content: <StepJob3 /> },
            { label: 'For-Profit Overview', content: <StepForProfitOverview /> },
            { label: 'For-Profit Main Category', content: <StepForProfitMain /> },
            { label: 'For-Profit Areas & Comments', content: <StepForProfitAreas /> },
            { label: 'Non-Profit Overview', content: <StepNonProfitOverview /> },
            { label: 'Non-Profit Main Category', content: <StepNonProfitMain /> },
            { label: 'Non-Profit Areas & Comments', content: <StepNonProfitAreas /> },
            { label: 'Working Preferences', content: <StepWorkingPreferences /> },
            { label: 'Work Type & Availability', content: <StepWorkTypeAvailability /> },
            { label: 'Parole/Probation Restrictions', content: <StepRestrictions /> },
        ],
        [],
    )

    const [activeStep, setActiveStep] = useState(0)
    const stepFieldNames: string[][] = useMemo(
        () => [
            [], // Welcome has no fields
            ['email', 'firstName', 'lastName', 'phoneNumber'],
            ['address.street', 'address.city', 'address.state', 'address.zip'],
            ['ageRange', 'gender', 'genderOther', 'sexualOrientation', 'sexualOrientationOther', 'race', 'ethnicity', 'raceEthnicityDescription'],
            ['educationLevel', 'contactMethod', 'contactMethodValue'],
            ['jobs.0.jobName', 'jobs.0.title', 'jobs.0.generalDescription', 'jobs.0.responsibilities', 'jobs.0.teamOrSoloDescription', 'jobs.0.favoritePart', 'jobs.0.skillsLearned'],
            ['jobs.1.jobName', 'jobs.1.title', 'jobs.1.generalDescription', 'jobs.1.responsibilities', 'jobs.1.teamOrSoloDescription', 'jobs.1.favoritePart', 'jobs.1.skillsLearned'],
            ['jobs.2.jobName', 'jobs.2.title', 'jobs.2.generalDescription', 'jobs.2.responsibilities', 'jobs.2.teamOrSoloDescription', 'jobs.2.favoritePart', 'jobs.2.skillsLearned'],
            [], // For-Profit Overview
            ['forProfit.mainCategory'],
            ['forProfit.areas', 'forProfit.comments', 'forProfit.religiousOrgAreasText'],
            [], // Non-Profit Overview
            ['nonProfit.mainCategory'],
            ['nonProfit.areas', 'nonProfit.comments'],
            ['workingPreferences', 'workingPreferencesComments'],
            ['workType', 'workTypeOther', 'workTypeComments', 'availabilityGrid'],
            ['paroleProbationRestrictionsText'],
        ],
        [],
    )

    const goNext = async () => {
        // Validate current step before advancing
        const valid = await trigger()
        if (!valid) return
        setActiveStep((s) => Math.min(s + 1, steps.length - 1))
    }

    const goBack = () => setActiveStep((s) => Math.max(s - 1, 0))

    const onFinish = handleSubmit((data) => {
        // For now, show results; later we can send to Firebase/Sheets
        setActiveStep(steps.length) // go to review
    })

    const onReset = () => {
        clearState()
        window.location.reload()
    }

    const isReview = activeStep === steps.length

    const chapters: Chapter[] = useMemo(
        () => [
            { label: 'Welcome', start: 0, end: 0 },
            { label: 'About You', start: 1, end: 4 },
            { label: 'Work History', start: 5, end: 7 },
            { label: 'For-Profit Interests', start: 8, end: 10 },
            { label: 'Non-Profit Interests', start: 11, end: 13 },
            { label: 'Preferences', start: 14, end: 16 },
        ],
        [],
    )

    const currentChapter = chapters.find((c) => activeStep >= c.start && activeStep <= c.end)
    const currentStepLabel = isReview ? 'Review' : steps[activeStep].label

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppHeader />

            <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 }, flex: 1 }}>
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <ChapterProgress chapters={chapters} activeStep={activeStep} totalSteps={steps.length} isReview={isReview} />
                </Box>

                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2.5, sm: 4, md: 5 },
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 30px 80px -40px rgba(31,59,77,0.25), 0 8px 24px -16px rgba(31,59,77,0.15)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        aria-hidden
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            pointerEvents: 'none',
                            background: 'radial-gradient(600px 200px at 0% 0%, rgba(31,59,77,0.05), transparent 60%), radial-gradient(500px 200px at 100% 0%, rgba(200,85,61,0.06), transparent 60%)',
                        }}
                    />

                    <Box sx={{ position: 'relative' }}>
                        {!isReview && currentChapter && (
                            <Stack spacing={0.5} sx={{ mb: 3 }}>
                                <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '0.22em', fontSize: 11 }}>
                                    {currentChapter.label}
                                </Typography>
                                <Typography variant="h4" component="h1">
                                    {currentStepLabel}
                                </Typography>
                            </Stack>
                        )}

                        <FormProvider {...methods}>
                            {!isReview ? (
                                <>
                                    <Box key={activeStep} className="wtmi-step-enter" sx={{ minHeight: 240 }}>
                                        {steps[activeStep].content}
                                    </Box>
                                    <StepActions
                                        activeStep={activeStep}
                                        stepsCount={steps.length}
                                        onBack={goBack}
                                        onNext={async () => {
                                            const fields = stepFieldNames[activeStep] ?? []
                                            const valid = fields.length ? await trigger(fields as any) : true
                                            if (!valid) return
                                            setActiveStep((s) => Math.min(s + 1, steps.length - 1))
                                        }}
                                        onFinish={onFinish}
                                        disableNext={false}
                                    />
                                </>
                            ) : (
                                <Box className="wtmi-step-enter">
                                    <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 4 }}>
                                        <Box
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: '50%',
                                                display: 'grid',
                                                placeItems: 'center',
                                                bgcolor: 'rgba(200,85,61,0.12)',
                                                color: 'secondary.dark',
                                            }}
                                        >
                                            <CheckCircleOutlineIcon sx={{ fontSize: 36 }} />
                                        </Box>
                                        <Typography variant="overline" color="secondary.main">
                                            Submitted
                                        </Typography>
                                        <Typography variant="h4" component="h1">
                                            Thank you
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520 }}>
                                            Your responses have been recorded. You can review the information you shared below, edit anything you’d like, or start over.
                                        </Typography>
                                    </Stack>

                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center" sx={{ mb: 4 }}>
                                        <Button variant="contained" color="primary" startIcon={<EditOutlinedIcon />} onClick={() => setActiveStep(0)}>
                                            Edit responses
                                        </Button>
                                        <Button variant="outlined" color="inherit" startIcon={<RestartAltIcon />} onClick={onReset} sx={{ borderColor: 'divider', color: 'text.secondary' }}>
                                            Clear & Restart
                                        </Button>
                                    </Stack>

                                    <Box
                                        sx={{
                                            mt: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: 'rgba(31,59,77,0.04)',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    >
                                        <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
                                            Your responses
                                        </Typography>
                                        <Box
                                            component="pre"
                                            sx={{
                                                m: 0,
                                                whiteSpace: 'pre-wrap',
                                                wordBreak: 'break-word',
                                                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
                                                fontSize: 12.5,
                                                color: 'text.secondary',
                                                maxHeight: 360,
                                                overflow: 'auto',
                                            }}
                                        >
                                            {JSON.stringify(values, null, 2)}
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </FormProvider>
                    </Box>
                </Paper>
            </Container>

            <AppFooter />
        </Box>
    )
}
