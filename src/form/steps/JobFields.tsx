import { Controller, useFormContext } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import type { FormValues } from '../../types'

type Props = { index: 0 | 1 | 2; title: string }

export default function JobFields({ index, title }: Props) {
    const { control } = useFormContext<FormValues>()
    const path = (k: string) => `jobs.${index}.${k}`
    return (
        <Stack spacing={2}>
            <Typography variant="h6">{title}</Typography>
            <Controller name={path('jobName') as any} control={control} rules={{ required: 'Required' }} render={({ field, fieldState }) => <TextField label="What was your job?" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />
            <Controller name={path('title') as any} control={control} rules={{ required: 'Required' }} render={({ field, fieldState }) => <TextField label="Title (if you had one)" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />
            <Controller name={path('generalDescription') as any} control={control} rules={{ required: 'Required' }} render={({ field, fieldState }) => <TextField label="General Description" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />} />
            <Controller
                name={path('responsibilities') as any}
                control={control}
                rules={{ required: 'Required' }}
                render={({ field, fieldState }) => <TextField label="What were your responsibilities?" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
            <Controller
                name={path('teamOrSoloDescription') as any}
                control={control}
                rules={{ required: 'Required' }}
                render={({ field, fieldState }) => <TextField label="Did you work alone or were you a member of a team? If so, please describe." multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
            <Controller
                name={path('favoritePart') as any}
                control={control}
                rules={{ required: 'Required' }}
                render={({ field, fieldState }) => <TextField label="What was your favorite part about the job?" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
            <Controller
                name={path('skillsLearned') as any}
                control={control}
                rules={{ required: 'Required' }}
                render={({ field, fieldState }) => <TextField label="What skills did you learn from this job that would be applicable to future roles?" multiline minRows={3} {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />}
            />
        </Stack>
    )
}
