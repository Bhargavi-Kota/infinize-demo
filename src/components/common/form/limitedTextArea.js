import React, {useState, useEffect} from 'react';
import BaseTextareaAutosize from '@mui/material/TextareaAutosize';
import {FormControl, Box, Typography} from '@mui/material';
import classes from './formFields.module.css';
import {styled} from '@mui/system';

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({theme}) => `font-family:${theme.typography.fontFamily}`
);

export function LimitedTextArea({
    maxWords = 100,
    name,
    label,
    value,
    onChange
}) {
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const words = value ? value.split(/\s+/).filter(Boolean).length : 0;
        setWordCount(words);
    }, [value]);
    const handleChange = e => {
        const text = event.target.value;
        const words = text.trim().split(/\s+/).filter(Boolean);
        setWordCount(words.length);
        onChange(text);
    };

    return (
        <FormControl fullWidth>
            <Box sx={{position: 'relative', width: '100%'}}>
                <TextareaAutosize
                    className={classes.infinize__textArea}
                    minRows={3}
                    maxRows={6}
                    value={value || ''}
                    onChange={handleChange}
                    id={name}
                    name={name}
                    aria-label={label}
                    placeholder={'Enter'}
                    fontFamily={'Poppins'}
                />
                <Typography
                    color="textSecondary"
                    sx={{
                        position: 'absolute',
                        bottom: '8px',
                        fontFamily: 'inherit',
                        right: '10px'
                    }}
                >
                    {`${wordCount} / ${maxWords}`}
                </Typography>
            </Box>
        </FormControl>
    );
}
