import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox, Typography } from '@mui/material'
import { useFormContext, useWatch } from 'react-hook-form'
import type { FormValues } from '../types'

type Props = {
    name: keyof FormValues
    rows: string[]
    cols: string[]
}

export default function MatrixGrid({ name, rows, cols }: Props) {
    const { setValue, control } = useFormContext<FormValues>()
    const watched = useWatch({ control, name }) as Record<string, Record<string, boolean>> | undefined
    const grid: Record<string, Record<string, boolean>> = watched || {}

    const toggle = (r: string, c: string) => {
        const current = !!grid?.[r]?.[c]
        const nextRow = { ...(grid?.[r] || {}), [c]: !current }
        const next = { ...(grid || {}), [r]: nextRow }
        setValue(name as any, next, { shouldDirty: true, shouldTouch: true })
    }

    return (
        <Table size="small" aria-label="availability grid">
            <TableHead>
                <TableRow>
                    <TableCell />
                    {cols.map((c) => (
                        <TableCell key={c}>
                            <Typography variant="caption">{c}</Typography>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((r) => (
                    <TableRow key={r}>
                        <TableCell>
                            <Typography variant="body2">{r}</Typography>
                        </TableCell>
                        {cols.map((c) => (
                            <TableCell key={c} align="center" onClick={() => toggle(r, c)} sx={{ cursor: 'pointer' }}>
                                <Checkbox checked={!!grid?.[r]?.[c]} onChange={() => toggle(r, c)} inputProps={{ 'aria-label': `${r} ${c}` }} />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
