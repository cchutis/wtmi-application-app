import { useMemo } from 'react'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import CheckboxGroupLimited from '../../components/CheckboxGroupLimited'
import { NON_PROFIT_AREAS } from '../../constants/nonProfit'
import type { FormValues } from '../../types'

export default function StepNonProfitAreas() {
    const { control } = useFormContext<FormValues>()
    const main = useWatch({ control, name: 'nonProfit.mainCategory' }) as string | undefined

    const cfg = useMemo(() => (main ? NON_PROFIT_AREAS[main] : undefined), [main])

    if (!main) return <Typography>Select a main category first.</Typography>

    return (
        <Stack spacing={2}>
            <CheckboxGroupLimited name="nonProfit.areas" label="Areas" options={cfg?.options || []} max={3} required includeOther={cfg?.includeOther} otherName="nonProfit.areasOther" />
            <Controller
                name="nonProfit.comments"
                control={control}
                rules={{ required: 'Comments are required' }}
                render={({ field, fieldState }) => <TextField label="Comments; please give us some more information about the areas you’ve picked:" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
        </Stack>
    )
}
