import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton
} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import {RESUME_ACCEPTED_FORMATS, RESUME_MAX_SIZE} from '@/config/constants';
import FileUpload from '../common/form/fileUpload';

export default function CareerDialog({
    open,
    onClose,
    Continue,
    handleResumeUpload,
    resumeFile,
    OnSkip,
    CloseModal
}) {
    const handleContinue = () => {
        Continue();
    };
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle
                sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px'
                }}
            >
                Create a personalized career recommendations
                <IconButton onClick={onClose} size="small">
                    <InfinizeIcon icon="ic:round-clear" />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{mx: '24px', borderTop: '1px solid #D5D5D5'}}>
                <Typography variant="h6" sx={{marginTop: 3, marginBottom: 1}}>
                    Upload Your Resume
                </Typography>
                <FileUpload
                    file={resumeFile}
                    setFile={handleResumeUpload}
                    label="Click to Upload"
                    acceptedFormats={RESUME_ACCEPTED_FORMATS}
                    maxSize={RESUME_MAX_SIZE}
                />
            </DialogContent>
            <DialogActions sx={{justifyContent: 'end', padding: 2}}>
                <Button
                    variant="outlined"
                    sx={{minWidth: 150, textTransform: 'none'}}
                    onClick={OnSkip}
                >
                    Skip for now
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{minWidth: 150, textTransform: 'none'}}
                    disabled={resumeFile == null}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}
