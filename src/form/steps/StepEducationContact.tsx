import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, FormHelperText } from '@mui/material'
import type { FormValues } from '../../types'
import { useEffect } from 'react'

const educationOptions = ['High School', 'Associates Degree', 'Vocational Degree', 'Some college', 'Undergraduate Degree', 'Graduate Degree', 'PhD, JD, MD']

const contactOptions = ['Phone call', 'Text', 'Email', 'WhatsApp']

export default function StepEducationContact() {
    const { control, setValue } = useFormContext<FormValues>()
    const contactMethod = useWatch({ control, name: 'contactMethod' }) as string

    // Clear dependent value when method changes
    useEffect(() => {
        setValue('contactMethodValue', '')
    }, [contactMethod, setValue])

    const isPhoneMethod = contactMethod === 'Phone call' || contactMethod === 'Text' || contactMethod === 'WhatsApp'
    const isEmailMethod = contactMethod === 'Email'

    return (
        <Stack spacing={3}>
            {/* Education */}
            <FormControl component="fieldset" required>
                <FormLabel component="legend">Education</FormLabel>
                <Controller
                    name="educationLevel"
                    control={control}
                    rules={{ required: 'Education is required' }}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup {...field}>
                                {educationOptions.map((o) => (
                                    <FormControlLabel key={o} value={o} control={<Radio />} label={o} />
                                ))}
                            </RadioGroup>
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </>
                    )}
                />
            </FormControl>

            {/* Contact method */}
            <FormControl component="fieldset" required>
                <FormLabel component="legend">What’s the best way for us to reach you?</FormLabel>
                <Controller
                    name="contactMethod"
                    control={control}
                    rules={{ required: 'Contact method is required' }}
                    render={({ field, fieldState }) => (
                        <>
                            <RadioGroup {...field}>
                                {contactOptions.map((o) => (
                                    <FormControlLabel key={o} value={o} control={<Radio />} label={o} />
                                ))}
                            </RadioGroup>
                            <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                        </>
                    )}
                />
            </FormControl>

            {/* Conditional follow-up */}
            {(isPhoneMethod || isEmailMethod) && (
                <Controller
                    name="contactMethodValue"
                    control={control}
                    rules={{
                        required: 'This field is required',
                        ...(isPhoneMethod ? { pattern: { value: /^[0-9+()\-\s]{7,20}$/, message: 'Enter a valid phone number' } } : { pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: 'Enter a valid email' } }),
                    }}
                    render={({ field, fieldState }) => <TextField label={isPhoneMethod ? 'Phone Number' : 'Email'} inputMode={isPhoneMethod ? 'tel' : 'email'} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
                />
            )}
        </Stack>
    )
}
