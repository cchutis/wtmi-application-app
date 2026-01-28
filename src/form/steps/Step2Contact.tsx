import { Controller, useFormContext } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import type { FormValues } from '../../types'

export default function Step2Contact() {
    const { control } = useFormContext<FormValues>()
    return (
        <Stack spacing={2}>
            <Typography variant="h6">Contact</Typography>
            <Controller
                name="email"
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: 'Enter a valid email' },
                }}
                render={({ field, fieldState }) => <TextField label="Email" inputMode="email" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
            <Controller
                name="phone"
                control={control}
                rules={{
                    pattern: { value: /^[0-9+()\-\s]*$/, message: 'Digits and +()- only' },
                }}
                render={({ field, fieldState }) => <TextField label="Phone" inputMode="tel" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
        </Stack>
    )
}
