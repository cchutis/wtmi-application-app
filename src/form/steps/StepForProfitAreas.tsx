import { useMemo } from 'react'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import { Stack, Typography, TextField } from '@mui/material'
import CheckboxGroupLimited from '../../components/CheckboxGroupLimited'
import { FOR_PROFIT_AREAS } from '../../constants/forProfit'
import type { FormValues } from '../../types'

export default function StepForProfitAreas() {
    const { control } = useFormContext<FormValues>()
    const main = useWatch({ control, name: 'forProfit.mainCategory' }) as string | undefined

    const cfg = useMemo(() => (main ? FOR_PROFIT_AREAS[main] : undefined), [main])

    if (!main) return <Typography>Select a main category first.</Typography>

    return (
        <Stack spacing={2}>
            <Typography>"Please check up to three areas that appeal to you, or specify other."</Typography>
            {cfg?.specialTextOnly ? (
                <>
                    <Controller name="forProfit.religiousOrgAreasText" control={control} rules={{ required: 'Areas is required' }} render={({ field, fieldState }) => <TextField label="Areas" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />
                    <Controller
                        name="forProfit.comments"
                        control={control}
                        rules={{ required: 'Comments are required' }}
                        render={({ field, fieldState }) => <TextField label="Comments; please give us some more information about the areas you’ve picked:" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
                    />
                </>
            ) : (
                <>
                    <CheckboxGroupLimited name="forProfit.areas" label="Areas" options={cfg?.options || []} max={3} required includeOther={cfg?.includeOther} otherName="forProfit.areasOther" enableSearch={main === 'Shopping'} />
                    <Controller
                        name="forProfit.comments"
                        control={control}
                        rules={{ required: 'Comments are required' }}
                        render={({ field, fieldState }) => <TextField label="Comments; please give us some more information about the areas you’ve picked:" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
                    />
                </>
            )}
        </Stack>
    )
}
