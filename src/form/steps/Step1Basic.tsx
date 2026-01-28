import { Controller, useFormContext } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import type { FormValues } from '../../types'

export default function Step1Basic() {
    const { control } = useFormContext<FormValues>()
    return (
        <Stack spacing={2}>
            <Typography variant="h6">Basic Info</Typography>
            <Controller name="firstName" control={control} rules={{ required: 'First name is required' }} render={({ field, fieldState }) => <TextField label="First Name" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />
            <Controller name="lastName" control={control} rules={{ required: 'Last name is required' }} render={({ field, fieldState }) => <TextField label="Last Name" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />
        </Stack>
    )
}
