import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, FormHelperText, Typography } from '@mui/material'
import MatrixGrid from '../../components/MatrixGrid'
import type { FormValues } from '../../types'

const rows = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const cols = ['6am–12pm', '12pm–6pm', '6pm–12am', '12am - 6am', 'None']

export default function StepWorkTypeAvailability() {
    const { control } = useFormContext<FormValues>()
    const workType = useWatch({ control, name: 'workType' }) as string

    return (
        <Stack spacing={3}>
            <FormControl component="fieldset" required>
                <FormLabel component="legend">What type of work are you looking for?</FormLabel>
                <Controller
                    name="workType"
                    control={control}
                    rules={{ required: 'Work type is required' }}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup {...field}>
                                {['Full-time', 'Part-time', 'Other'].map((o) => (
                                    <FormControlLabel key={o} value={o} control={<Radio />} label={o} />
                                ))}
                            </RadioGroup>
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </>
                    )}
                />
            </FormControl>

            {workType === 'Other' && <Controller name="workTypeOther" control={control} rules={{ required: 'Please specify' }} render={({ field, fieldState }) => <TextField label="Please specify" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />}

            <Controller name="workTypeComments" control={control} rules={{ required: 'Comments are required' }} render={({ field, fieldState }) => <TextField label="Comments:" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />

            <Typography variant="subtitle1">Please show your availability using the grid below.</Typography>
            <MatrixGrid name={'availabilityGrid'} rows={rows} cols={cols} />
        </Stack>
    )
}
