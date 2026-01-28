import { Controller, useFormContext } from 'react-hook-form'
import { Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material'
import { NON_PROFIT_MAIN } from '../../constants/nonProfit'
import type { FormValues } from '../../types'

export default function StepNonProfitMain() {
    const { control } = useFormContext<FormValues>()
    return (
        <Stack spacing={3}>
            <FormControl component="fieldset" required>
                <FormLabel component="legend">Non-Profit: Main Category</FormLabel>
                <Controller
                    name="nonProfit.mainCategory"
                    control={control}
                    rules={{ required: 'Please select a main category' }}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup {...field}>
                                {NON_PROFIT_MAIN.map((o) => (
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
