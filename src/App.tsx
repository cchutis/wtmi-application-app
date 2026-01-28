import { useEffect, useMemo, useState } from 'react'
import { Container, Paper, Box, Typography, Divider, LinearProgress } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
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

    return (
        <Container maxWidth={false} sx={{ py: 3 }}>
            <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
                <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
                    <Typography variant="h5" gutterBottom>
                        2025 Employment Inquiry
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Touch-friendly multistep form with autosave.
                    </Typography>

                    <Box mt={2}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Step {isReview ? steps.length : activeStep + 1} of {steps.length}
                        </Typography>
                        <LinearProgress variant="determinate" value={((isReview ? steps.length : activeStep + 1) / steps.length) * 100} sx={{ height: 8, borderRadius: 4 }} />
                        <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'center' }}>
                            {isReview ? 'Review' : steps[activeStep].label}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    <FormProvider {...methods}>
                        {!isReview ? (
                            <>
                                <Box minHeight={220}>{steps[activeStep].content}</Box>
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
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Results
                                </Typography>
                                <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(values, null, 2)}</pre>
                                <Box display={{ xs: 'block', sm: 'flex' }} gap={2} mt={2}>
                                    <button onClick={() => setActiveStep(0)}>Edit</button>
                                    <button onClick={onReset}>Clear & Restart</button>
                                </Box>
                            </Box>
                        )}
                    </FormProvider>
                </Box>
            </Paper>
        </Container>
    )
}
