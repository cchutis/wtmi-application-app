import { Controller, useFormContext } from 'react-hook-form'
import { Stack, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import type { FormValues } from '../../types'
import { US_STATES } from '../../constants/usStates'

export default function StepAddress() {
    const { control } = useFormContext<FormValues>()
    return (
        <Stack spacing={2}>
            <Controller name="address.street" control={control} rules={{ required: 'Street Address is required' }} render={({ field, fieldState }) => <TextField label="Street Address" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />

            <Controller name="address.city" control={control} rules={{ required: 'City is required' }} render={({ field, fieldState }) => <TextField label="City" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />

            <Controller
                name="address.state"
                control={control}
                rules={{ required: 'State is required' }}
                render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error}>
                        <InputLabel id="state-label">State</InputLabel>
                        <Select labelId="state-label" label="State" {...field}>
                            {US_STATES.map((s) => (
                                <MenuItem key={s.code} value={s.code}>
                                    {s.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />

            <Controller
                name="address.zip"
                control={control}
                rules={{
                    required: 'Zip is required',
                    pattern: { value: /^(\d{5})(-\d{4})?$/, message: 'Enter a valid ZIP (##### or #####-####)' },
                }}
                render={({ field, fieldState }) => <TextField label="Zip" inputMode="numeric" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
        </Stack>
    )
}
