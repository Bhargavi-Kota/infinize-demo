'use client';
import React from 'react';
import {
    Checkbox,
    FormControlLabel,
    FormControl,
    Box,
    InputLabel
} from '@mui/material';

export function CheckboxGroup({name, label, options, setFormData, formData}) {
    return (
        <FormControl component="fieldset" fullWidth>
            <InputLabel id={`${name}-label`} sx={{display: 'none'}}>
                {label}
            </InputLabel>
            <Box display="flex" flexWrap="wrap">
                {options.map(option => (
                    <FormControlLabel
                        key={option}
                        control={
                            <Checkbox
                                name={name}
                                value={option || ''}
                                checked={(formData[name] || []).includes(
                                    option
                                )}
                                onChange={e => {
                                    const selected = formData[name] || [];
                                    setFormData(prev => ({
                                        ...prev,
                                        [name]: e.target.checked
                                            ? [...selected, option]
                                            : selected.filter(
                                                  item => item !== option
                                              )
                                    }));
                                }}
                            />
                        }
                        label={option}
                    />
                ))}
            </Box>
        </FormControl>
    );
}
