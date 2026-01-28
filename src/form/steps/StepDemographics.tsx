import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, FormGroup, Checkbox, FormHelperText, Typography } from '@mui/material'
import type { FormValues } from '../../types'

export default function StepDemographics() {
    const { control } = useFormContext<FormValues>()
    const gender = useWatch({ control, name: 'gender' })
    const sexualOrientation = useWatch({ control, name: 'sexualOrientation' })
    const ethnicity = useWatch({ control, name: 'ethnicity' }) as string[]

    const genderOptions = ['Male', 'Female', 'Nonbinary', 'Prefer not to say', 'Other']
    const sexualOptions = ['Straight', 'Gay', 'Lesbian', 'Bisexual', 'Pansexual', 'Demisexual', 'Asexual', 'Queer', 'Questioning', 'Prefer Not to Say', 'Other']
    const ageOptions = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-60', '60+']
    const raceOptions = ['White', 'Black of African American', 'Native/"American Indian" or Alaska Native', 'Asian', 'Native Hawaiian or Other Pacific Islander', 'Multiracial; 2 or More Races', 'Other Race']
    const ethnicityOptions = ['Hispanic or Latino', 'Not Hispanic or Latino', 'Caucasian', 'African American', 'Native American', 'Asian (North, South, East, West, Southeast)']

    return (
        <Stack spacing={3}>
            {/* Age */}
            <FormControl component="fieldset" required>
                <FormLabel component="legend">Age</FormLabel>
                <Controller
                    name="ageRange"
                    control={control}
                    rules={{ required: 'Age is required' }}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup {...field}>
                                {ageOptions.map((o) => (
                                    <FormControlLabel key={o} value={o} control={<Radio />} label={o} />
                                ))}
                            </RadioGroup>
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </>
                    )}
                />
            </FormControl>

            {/* Gender */}
            <FormControl component="fieldset" required>
                <FormLabel component="legend">Gender</FormLabel>
                <Controller
                    name="gender"
                    control={control}
                    rules={{ required: 'Gender is required' }}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup {...field}>
                                {genderOptions.map((o) => (
                                    <FormControlLabel key={o} value={o} control={<Radio />} label={o} />
                                ))}
                            </RadioGroup>
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </>
                    )}
                />
            </FormControl>

            {gender === 'Other' && <Controller name="genderOther" control={control} rules={{ required: 'Please specify your gender' }} render={({ field, fieldState }) => <TextField label="Please specify" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />}

            {/* Sexual Orientation */}
            <FormControl component="fieldset" required>
                <FormLabel component="legend">Sexual Orientation</FormLabel>
                <Controller
                    name="sexualOrientation"
                    control={control}
                    rules={{ required: 'Sexual Orientation is required' }}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup {...field}>
                                {sexualOptions.map((o) => (
                                    <FormControlLabel key={o} value={o} control={<Radio />} label={o} />
                                ))}
                            </RadioGroup>
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </>
                    )}
                />
            </FormControl>

            {sexualOrientation === 'Other' && (
                <Controller name="sexualOrientationOther" control={control} rules={{ required: 'Please specify your sexual orientation' }} render={({ field, fieldState }) => <TextField label="Please specify" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />
            )}

            {/* Race */}
            <FormControl component="fieldset" required>
                <FormLabel component="legend">Race</FormLabel>
                <Controller
                    name="race"
                    control={control}
                    rules={{ required: 'Race is required' }}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup {...field}>
                                {raceOptions.map((o) => (
                                    <FormControlLabel key={o} value={o} control={<Radio />} label={o} />
                                ))}
                            </RadioGroup>
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </>
                    )}
                />
            </FormControl>

            {/* Ethnicity (min 1) */}
            <FormControl component="fieldset" required error={!(ethnicity && ethnicity.length > 0)}>
                <FormLabel component="legend">Ethnicity (select at least one)</FormLabel>
                <Controller
                    name="ethnicity"
                    control={control}
                    rules={{ validate: (v) => (v && v.length > 0) || 'Select at least one option' }}
                    render={({ field, fieldState }) => (
                        <>
                            <FormGroup>
                                {ethnicityOptions.map((o) => (
                                    <FormControlLabel
                                        key={o}
                                        control={
                                            <Checkbox
                                                checked={field.value?.includes(o) || false}
                                                onChange={(e) => {
                                                    const checked = e.target.checked
                                                    if (checked) field.onChange([...(field.value || []), o])
                                                    else field.onChange((field.value || []).filter((x: string) => x !== o))
                                                }}
                                            />
                                        }
                                        label={o}
                                    />
                                ))}
                            </FormGroup>
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </>
                    )}
                />
            </FormControl>

            {/* Description textarea */}
            <Controller
                name="raceEthnicityDescription"
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field, fieldState }) => (
                    <TextField label={'My race or ethnicity is best described as...(Please either restate the above, or feel free to be more specific than the above allowed you to)'} multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
                )}
            />
        </Stack>
    )
}
