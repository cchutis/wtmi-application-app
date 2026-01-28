import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, TextField, FormHelperText, Stack } from '@mui/material'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

type Props = {
    name: string
    label: string
    options: string[]
    max?: number
    required?: boolean
    includeOther?: boolean
    otherName?: string
    enableSearch?: boolean
}

export default function CheckboxGroupLimited({ name, label, options, max, required, includeOther, otherName, enableSearch }: Props) {
    const { control } = useFormContext()
    const selected: string[] = useWatch({ control, name }) || []

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                validate: (v: string[]) => {
                    if (required && (!v || v.length === 0)) return 'Select at least one option'
                    if (max && v && v.length > max) return `Select up to ${max} options`
                    return true
                },
            }}
            render={({ field, fieldState }) => {
                const values: string[] = field.value || []
                const hasOther = includeOther && otherName
                const list = hasOther && !options.includes('Other') ? [...options, 'Other'] : options
                const [query, setQuery] = [undefined, undefined] as unknown as [string, (q: string) => void]

                const filtered = enableSearch && query ? list.filter((o) => o.toLowerCase().includes(query.toLowerCase())) : list

                return (
                    <FormControl component="fieldset" error={!!fieldState.error} required={required}>
                        <FormLabel component="legend">{label}</FormLabel>
                        <Stack spacing={1}>
                            {enableSearch && <TextField placeholder="Search options" value={query || ''} onChange={(e) => setQuery(e.target.value)} />}
                            <FormGroup>
                                {filtered.map((o) => (
                                    <FormControlLabel
                                        key={o}
                                        control={
                                            <Checkbox
                                                checked={values.includes(o)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked
                                                    const next = checked ? [...values, o] : values.filter((x) => x !== o)
                                                    field.onChange(next)
                                                }}
                                            />
                                        }
                                        label={o}
                                    />
                                ))}
                            </FormGroup>
                            {hasOther && values.includes('Other') && (
                                <Controller name={otherName as string} control={control} rules={{ required: 'Please specify' }} render={({ field: f2, fieldState: fs2 }) => <TextField label="Please specify" {...f2} error={!!fs2.error} helperText={fs2.error?.message} />} />
                            )}
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </Stack>
                    </FormControl>
                )
            }}
        />
    )
}
