'use client';
import {useState} from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    Menu,
    MenuItem,
    ListItemIcon,
    CircularProgress
} from '@mui/material';
import styles from './career.module.css';
import {InfinizeIcon} from '../common';
import {theme} from '@/config';

export default function JobRecommendations({
    jobs = [],
    selectedJobIndex,
    onJobSelect,
    isEditable = false,
    savedJobs,
    handleSaveJob,
    loadingJob // new prop passed from parent
}) {
    const handleMoreDetails = index => {
        onJobSelect(index);
    };

    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobList, setJobList] = useState(jobs);

    const handleMenuOpen = (event, index) => {
        setMenuAnchor(event.currentTarget);
        setSelectedJob(index);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
        setSelectedJob(null);
    };

    const handleDeleteJob = () => {
        const newJobs = jobs.filter((_, i) => i !== selectedJob);
        setJobList(newJobs);
        handleMenuClose();
    };

    return (
        <>
            <Stack
                className={
                    !isEditable
                        ? styles.infinize__jobRecommendationsEditCards
                        : styles.infinize__jobRecommendationsCards
                }
                sx={
                    !isEditable
                        ? {
                              display: 'grid',
                              gridTemplateColumns: {
                                  sm: '1fr',
                                  md: '1fr 1fr',
                                  lg: '1fr 1fr 1fr'
                              },
                              gap: 2
                          }
                        : {}
                }
            >
                {jobs?.map((job, index) => (
                    <Box
                        key={index}
                        className={`${
                            !isEditable
                                ? styles.infinize__jobRecommendationsEditCard
                                : `${styles.infinize__jobRecommendationsCard} ${
                                      selectedJobIndex === index
                                          ? styles.selectedCard
                                          : ''
                                  }`
                        }`}
                        onClick={
                            isEditable ? () => onJobSelect(index) : undefined
                        }
                    >
                        {!isEditable && (
                            <ListItemIcon
                                onClick={event => handleMenuOpen(event, index)}
                                sx={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '-10px',
                                    cursor: 'pointer'
                                }}
                            >
                                <InfinizeIcon
                                    icon="mi:options-vertical"
                                    style={{color: '#a5a5a5'}}
                                />
                            </ListItemIcon>
                        )}
                        <Typography variant="h4" fontWeight="bold">
                            {job.title}
                        </Typography>

                        <Typography variant="body2">
                            {job.description}
                        </Typography>
                        <Box
                            className={
                                styles.infinize__jobRecommendationsSalary
                            }
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                {isEditable && (
                                    <Typography variant="h5">
                                        {job.salary} <span>{job.duration}</span>
                                    </Typography>
                                )}
                                <Typography variant="body2">
                                    Match: {job.match}
                                </Typography>
                            </Stack>
                            {!isEditable ? (
                                <Button
                                    onClick={() => handleMoreDetails(index)}
                                    sx={{
                                        background: theme.palette.primary.main
                                    }}
                                >
                                    More Info
                                </Button>
                            ) : (
                                <>
                                    {savedJobs?.[index] ? (
                                        <Box
                                            sx={{
                                                color: theme.palette.primary
                                                    .main,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <InfinizeIcon
                                                icon="mdi-tick"
                                                width="20px"
                                                height="20px"
                                            />
                                            <Typography
                                                className={
                                                    styles.infinize__jobSavedText
                                                }
                                            >
                                                Saved
                                            </Typography>
                                        </Box>
                                    ) : // If this job is being saved, show a loading indicator
                                    loadingJob === index ? (
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <CircularProgress size={18} />
                                            <Typography
                                                variant="body2"
                                                color="primary"
                                                className={
                                                    styles.infinize__jobSavingText
                                                }
                                            >
                                                Saving...
                                            </Typography>
                                        </Stack>
                                    ) : (
                                        <Button
                                            onClick={() => handleSaveJob(index)}
                                        >
                                            Save
                                        </Button>
                                    )}
                                </>
                            )}
                        </Box>
                    </Box>
                ))}
                <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleMenuClose}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0px 3px 12px 0px rgba(0, 0, 0, 0.25)',
                            padding: '5px 10px',
                            marginLeft: '10px',
                            marginTop: '-10px'
                        }
                    }}
                >
                    <MenuItem onClick={handleDeleteJob} className="menuItem">
                        <ListItemIcon>
                            <InfinizeIcon
                                icon="lucide:circle-minus"
                                style={{color: '#5A6876'}}
                            />
                        </ListItemIcon>
                        Delete
                    </MenuItem>
                    <MenuItem
                        onClick={() => console.log(`share job `)}
                        className="menuItem"
                    >
                        <ListItemIcon>
                            <InfinizeIcon
                                icon="fluent:share-16-filled"
                                style={{color: '#5A6876'}}
                            />
                        </ListItemIcon>
                        Share
                    </MenuItem>
                </Menu>
            </Stack>
        </>
    );
}
