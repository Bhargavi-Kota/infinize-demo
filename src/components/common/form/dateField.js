'use client';
import React, {useState} from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {IconButton, InputAdornment, TextField} from '@mui/material';
import {InfinizeIcon} from '../index';

export function DateFieldComponent({name, label, value, onChange}) {
    const [open, setOpen] = useState(false);

    const handleClear = event => {
        event.stopPropagation();
        onChange('');
    };

    const handleCalendarClick = event => {
        event.stopPropagation();
        setOpen(true);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                name={name}
                value={value ? dayjs(value) : null}
                onChange={newValue =>
                    onChange(newValue ? newValue.format('YYYY-MM-DD') : '')
                }
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                slots={{
                    textField: params => (
                        <TextField
                            {...params}
                            fullWidth
                            onClick={() => setOpen(true)}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {value ? (
                                            <IconButton
                                                size="small"
                                                onClick={handleClear}
                                                edge="end"
                                            >
                                                <InfinizeIcon icon="ic:round-clear" />
                                            </IconButton>
                                        ) : (
                                            <IconButton
                                                size="small"
                                                onClick={handleCalendarClick}
                                                edge="end"
                                            >
                                                <InfinizeIcon icon="qlementine-icons:calendar-16" />
                                            </IconButton>
                                        )}
                                    </InputAdornment>
                                )
                            }}
                        />
                    )
                }}
            />
        </LocalizationProvider>
    );
}
