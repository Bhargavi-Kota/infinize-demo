import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderDialog = ({open}) => {
    return (
        <Dialog open={open}>
            <DialogContent
                style={{
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px'
                }}
            >
                <CircularProgress size={50} />
            </DialogContent>
        </Dialog>
    );
};

export default LoaderDialog;
