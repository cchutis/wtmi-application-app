import { Controller, useFormContext } from 'react-hook-form'
import { Stack, TextField } from '@mui/material'
import type { FormValues } from '../../types'

export default function StepContact() {
    const { control } = useFormContext<FormValues>()
    return (
        <Stack spacing={2}>
            <Controller
                name="email"
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: 'Enter a valid email' },
                }}
                render={({ field, fieldState }) => <TextField label="Email" inputMode="email" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />

            <Controller name="fullName" control={control} rules={{ required: 'Name is required' }} render={({ field, fieldState }) => <TextField label="Name" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />

            <Controller
                name="phoneNumber"
                control={control}
                rules={{
                    required: 'Phone number is required',
                    pattern: { value: /^[0-9+()\-\s]{7,20}$/, message: 'Enter a valid phone number' },
                }}
                render={({ field, fieldState }) => <TextField label="Phone Number" inputMode="tel" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
        </Stack>
    )
}
