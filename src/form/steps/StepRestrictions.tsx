import { Controller, useFormContext } from 'react-hook-form'
import { Stack, TextField } from '@mui/material'
import type { FormValues } from '../../types'

export default function StepRestrictions() {
    const { control } = useFormContext<FormValues>()
    return (
        <Stack spacing={2}>
            <Controller
                name="paroleProbationRestrictionsText"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field, fieldState }) => (
                    <TextField label="Do you have any restrictions due to parole or probation? Please let us know what they are so we can accommodate the times you may or may not be available." multiline minRows={4} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
                )}
            />
        </Stack>
    )
}
