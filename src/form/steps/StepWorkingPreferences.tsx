import { Controller, useFormContext } from 'react-hook-form'
import { Stack, TextField } from '@mui/material'
import CheckboxGroupLimited from '../../components/CheckboxGroupLimited'
import type { FormValues } from '../../types'

const options = ['In Person', 'Remote', 'Hybrid', 'Field work (on-site, off location)', 'Physical work', 'Travel-based work', 'Customer-Facing Work (sales, service, support)', 'Independent Work']

export default function StepWorkingPreferences() {
    const { control } = useFormContext<FormValues>()
    return (
        <Stack spacing={2}>
            <CheckboxGroupLimited name="workingPreferences" label="What are your working preferences? (Check all that apply)" options={options} required />
            <Controller
                name="workingPreferencesComments"
                control={control}
                rules={{ required: 'Comments are required' }}
                render={({ field, fieldState }) => <TextField label="Comments; please give us some more information about the areas you’ve picked:" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
        </Stack>
    )
}
