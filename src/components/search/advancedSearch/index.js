'use client';
import React from 'react';
import AdvancedSearchForm from '../studentSearch/advancedSearchForm.js';
import classes from './advancedSearch.module.css';
import {Typography, Box} from '@mui/material';

export default function AdvancedSearch() {
    return (
        <Box className={classes.infinize__advancedSearch__container}>
            <AdvancedSearchForm />
        </Box>
    );
}
