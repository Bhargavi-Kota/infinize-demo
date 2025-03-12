'use client';
import React from 'react';
import {Button} from '@mui/material';

import classes from '../advancedSearch/advancedSearch.module.css';

export function SearchButtons({
    formData,
    handleSearch,
    handleCancel,
    setOpen,
    isSearchDisabled
}) {
    return (
        <>
            <Button
                variant="contained"
                className={classes.infinize__advancedSearch__button}
                onClick={handleSearch}
                disabled={isSearchDisabled}
                sx={{
                    textTransform: 'none'
                }}
            >
                Search
            </Button>

            <Button
                variant="outlined"
                className={classes.infinize__advancedSearch__button}
                onClick={handleCancel}
                sx={{
                    textTransform: 'none'
                }}
            >
                Cancel
            </Button>

            <Button
                sx={{
                    color: 'primary.main',
                    textDecoration: 'underline',
                    textTransform: 'none'
                }}
                disabled={isSearchDisabled}
                onClick={() => setOpen(true)}
            >
                Save
            </Button>
        </>
    );
}
