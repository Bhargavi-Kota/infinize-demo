'use client';
import {useState, useEffect, useRef} from 'react';
import {
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    CircularProgress
} from '@mui/material';
import JobRecommendations from './jobs';
import JobDetails from './details';
import JobData from '@/data/careerRecomendation/careerRecommendations.json';
import styles from './career.module.css';
import {InfinizeIcon} from '../common';
import {theme} from '@/config';

export default function CareerRecommendations({
    isEditable = false,
    onReset,
    open
}) {
    const jobList = JobData.recommendations || [];
    const [selectedJobIndex, setSelectedJobIndex] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [savedJobs, setSavedJobs] = useState({});
    const [loadingJob, setLoadingJob] = useState(null);

    const listRef = useRef(null);
    const [listHeight, setListHeight] = useState(0);

    useEffect(() => {
        if (listRef.current) {
            setListHeight(listRef.current.clientHeight);
        }
    }, [jobList]);

    const handleSaveJob = index => {
        setLoadingJob(index);
        setTimeout(() => {
            sessionStorage.setItem('hasCareerRecommendations', 'true');
            setSavedJobs(prev => ({
                ...prev,
                [index]: !prev[index]
            }));
            setLoadingJob(null);
        }, 2000);
    };

    const handleOpenDialog = index => {
        setSelectedJobIndex(index);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    useEffect(() => {
        if (isEditable) {
            window.scrollTo(0, 0);
        }
    }, [isEditable]);
    return (
        <Stack
            className={
                isEditable && styles.infinize__careerRecommendationsContainer
            }
        >
            {isEditable && (
                <Box
                    className={
                        styles.infinize__careerRecommendationsContainerHeading
                    }
                >
                    <Typography variant="h2" color="primary">
                        Career recommendations
                    </Typography>
                    <IconButton
                        onClick={onReset}
                        sx={{
                            border: `2px solid ${theme.palette.primary.main}`,
                            borderRadius: '8px'
                        }}
                    >
                        <InfinizeIcon
                            icon="ri-reset-left-fill"
                            style={{
                                color: theme.palette.primary.main,
                                transform: 'rotate(270deg)'
                            }}
                        />
                    </IconButton>
                </Box>
            )}

            <Stack direction="row" spacing={4} padding="20px 30px">
                <Box ref={listRef} sx={{width: !isEditable ? '100%' : '35%'}}>
                    <JobRecommendations
                        jobs={!isEditable ? jobList.slice(0, 2) : jobList}
                        selectedJobIndex={selectedJobIndex}
                        onJobSelect={
                            !isEditable ? handleOpenDialog : setSelectedJobIndex
                        }
                        isEditable={isEditable}
                        savedJobs={savedJobs}
                        handleSaveJob={handleSaveJob}
                        loadingJob={loadingJob}
                    />
                </Box>

                {isEditable && jobList.length > 0 && (
                    <Box
                        sx={{
                            maxHeight: listHeight,
                            overflowY: 'auto',
                            width: '65%'
                        }}
                    >
                        <JobDetails
                            job={jobList[selectedJobIndex]}
                            savedJobs={savedJobs}
                            handleSaveJob={handleSaveJob}
                            jobIndex={selectedJobIndex}
                            isEditable={isEditable}
                            loadingJob={loadingJob}
                        />
                    </Box>
                )}
            </Stack>

            {/* Dialog for JobDetails when not in editable mode */}
            {!isEditable && (
                <Dialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    fullWidth
                    maxWidth="md"
                    sx={{
                        '& .MuiDialog-paper': {
                            borderRadius: '12px',
                            padding: '50px 20px 20px'
                        }
                    }}
                >
                    <DialogTitle>
                        <IconButton
                            onClick={handleCloseDialog}
                            style={{position: 'absolute', right: 10, top: 10}}
                        >
                            <InfinizeIcon icon="si-close-fill" />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <JobDetails
                            job={jobList[selectedJobIndex]}
                            customStyles={{width: '100%', height: '500px'}}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </Stack>
    );
}
