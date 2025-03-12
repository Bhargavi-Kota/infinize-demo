import React from 'react';
import {
    Autocomplete,
    Checkbox,
    FormControl,
    TextField,
    Box,
    Typography,
    FormHelperText
} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {CustomChip} from './customChip';

export function MultiAutocomplete({
    name,
    label,
    options,
    value = [],
    onChange,
    helperText
}) {
    const handleDelete = itemToDelete => {
        onChange(value.filter(item => item !== itemToDelete));
    };

    return (
        <FormControl fullWidth>
            <TextField
                label={label}
                sx={visuallyHidden}
                aria-labelledby={`${name}-label`}
            />
            <Autocomplete
                multiple
                options={options}
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
                disableCloseOnSelect
                getOptionLabel={option => option}
                renderOption={(props, option, {selected}) => {
                    const {key, ...rest} = props;
                    return (
                        <li key={option} {...rest}>
                            <Checkbox checked={selected} />
                            {option}
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
                        placeholder={value.length > 0 ? '' : 'Select'}
                        fullWidth
                    />
                )}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
