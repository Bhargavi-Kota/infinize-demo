'use client';
import React from 'react';
import {Chip} from '@mui/material';

export function CustomChip({label, onDelete, size = 'small'}) {
    return (
        <Chip
            className="infinize__chip"
            label={label}
            onDelete={onDelete}
            size={size}
            variant="outlined"
            onMouseDown={e => e.stopPropagation()}
        />
    );
}
