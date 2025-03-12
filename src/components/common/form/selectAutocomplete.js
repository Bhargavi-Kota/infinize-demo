'use client';
import React from 'react';
import {
    Autocomplete,
    TextField,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment
} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import {visuallyHidden} from '@mui/utils';

export function selectAutocomplete({
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
            <TextField
                label={label}
                sx={visuallyHidden}
                aria-labelledby={`${name}-label`}
            />
            <Autocomplete
                options={options}
                value={value || null}
                onChange={(event, newValue) => onChange(newValue)}
                disableCloseOnSelect
                getOptionLabel={option =>
                    typeof option === 'object' ? option.label : option
                }
                renderOption={(props, option) => {
                    return (
                        <li key={option.key} {...props}>
                            {option.label}
                        </li>
                    );
                }}
                renderTags={(selected, getTagProps) => (
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {selected.map((item, index) => {
                            const {key, ...tagProps} = getTagProps({index});
                            return (
                                <CustomChip
                                    key={item}
                                    label={item}
                                    onDelete={() => handleDelete(item)}
                                    {...tagProps}
                                />
                            );
                        })}
                    </Box>
                )}
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Select"
                        fullWidth
                    />
                )}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
