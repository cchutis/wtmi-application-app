import { Controller, useFormContext } from 'react-hook-form'
import { Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material'
import { FOR_PROFIT_MAIN } from '../../constants/forProfit'
import type { FormValues } from '../../types'

export default function StepForProfitMain() {
    const { control } = useFormContext<FormValues>()
    return (
        <Stack spacing={3}>
            <FormControl component="fieldset" required>
                <FormLabel component="legend">For-Profit: Main Category Opportunities</FormLabel>
                <Controller
                    name="forProfit.mainCategory"
                    control={control}
                    rules={{ required: 'Please select a main category' }}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup {...field}>
                                {FOR_PROFIT_MAIN.map((o) => (
                                    <FormControlLabel key={o} value={o} control={<Radio />} label={o} />
                                ))}
                            </RadioGroup>
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </>
                    )}
                />
            </FormControl>
        </Stack>
    )
}
