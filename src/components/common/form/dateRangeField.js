'use client';
import React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import {SingleInputDateRangeField} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {IconButton, InputAdornment} from '@mui/material';
import {InfinizeIcon} from '../index';
import {LicenseInfo} from '@mui/x-license';

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_PRO_KEY);

export function DateRangePickerComponent({name, value, onChange}) {
    const handleChange = newValue => {
        onChange(name, newValue);
    };

    const handleClear = event => {
        event.stopPropagation(); //
        onChange(name, [null, null]);
    };

    const hasValue = value && value[0] && value[1];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['SingleInputDateRangeField']}>
                <DateRangePicker
                    value={value || [null, null]}
                    onChange={handleChange}
                    slots={{field: SingleInputDateRangeField}}
                    slotProps={{
                        textField: {
                            InputProps: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {hasValue ? (
                                            <IconButton
                                                size="small"
                                                onClick={handleClear}
                                                edge="end"
                                            >
                                                <InfinizeIcon icon="ic:round-clear" />
                                            </IconButton>
                                        ) : (
                                            <InfinizeIcon
                                                icon={
                                                    'qlementine-icons:calendar-16'
                                                }
                                            />
                                        )}
                                    </InputAdornment>
                                )
                            }
                        }
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
