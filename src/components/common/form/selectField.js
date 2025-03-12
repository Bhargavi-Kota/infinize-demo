'use client';
import React from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel
} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import {visuallyHidden} from '@mui/utils';

export function SelectField({
    name,
    label,
    options = [],
    value,
    onChange,
    helperText,
    placeholder = 'Select'
}) {
    const handleClear = event => {
        event.stopPropagation();
        onChange('', name);
    };
    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`} sx={visuallyHidden}>
                {label}
            </InputLabel>
            <Select
                id={name}
                name={name}
                placeholder="Select"
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                displayEmpty
                renderValue={selected =>
                    selected ? (
                        selected
                    ) : (
                        <span style={{color: '#aaa'}}>{placeholder}</span>
                    )
                }
                sx={{
                    '& .MuiSelect-icon': {
                        display: value ? 'none' : 'block'
                    }
                }}
                inputProps={{
                    'aria-labelledby': `${name}-label`,
                    id: name
                }}
                endAdornment={
                    value && (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClear}
                                edge="end"
                                size="small"
                            >
                                <InfinizeIcon
                                    icon="ic:round-clear"
                                    width={20}
                                    hight={20}
                                />
                            </IconButton>
                        </InputAdornment>
                    )
                }
            >
                {options.length > 0 ? (
                    options.map((option, idx) => (
                        <MenuItem
                            key={option?.id || option?.value || `option-${idx}`}
                            value={option?.value || option}
                        >
                            {option?.label || option}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No options available</MenuItem>
                )}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
