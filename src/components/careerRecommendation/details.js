'use client';
import {
    Box,
    Typography,
    ButtonGroup,
    Button,
    useTheme,
    Stack,
    Grid,
    CircularProgress
} from '@mui/material';
import styles from './career.module.css';
import Image from 'next/image';
import {InfinizeIcon} from '../common';
import {useEffect, useState} from 'react';
import Data from '@/data/careerRecomendation/jobDetails.json';

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceDot
} from 'recharts';
import ChartComponent from './jobOutlookChart';

const data = [
    {year: 2018, salary: 50000},
    {year: 2019, salary: 55000},
    {year: 2020, salary: 60000},
    {year: 2021, salary: 70000},
    {year: 2022, salary: 75000},
    {year: 2023, salary: 80000}
];

export default function JobDetails({
    job,
    jobIndex,
    savedJobs,
    handleSaveJob,
    customStyles = {},
    isEditable = false,
    loadingJob
}) {
    if (!job) return null;
    const theme = useTheme();
    console.log(isEditable);

    useEffect(() => {
        if (isEditable) {
            window.scrollTo(0, 0);
        }
    }, [isEditable]);
    return (
        <Box
            className={styles.infinize__jobDetails}
            sx={customStyles}
            // height={{xs: '100vh', md: '120vh', lg: '90vh'}}
        >
            <Box className={styles.infinize__jobDetailsData}>
                <Image
                    src="/img/job.jpg"
                    width={800}
                    height={160}
                    alt="job-image"
                />
                <Stack spacing={1}>
                    <Typography variant="h3" color="primary">
                        {job.title}
                    </Typography>
                    <Typography variant="body1">{job.description}</Typography>
                </Stack>

                <Box className={styles.infinize__jobDetailsButtonGroup}>
                    <ButtonGroup>
                        <Button
                            startIcon={
                                <InfinizeIcon icon="material-symbols:print-outline-rounded" />
                            }
                            sx={{
                                border: `1px solid ${theme.palette.primary.main}`
                            }}
                        >
                            Print
                        </Button>
                        <Button
                            startIcon={
                                <InfinizeIcon icon="fluent:share-16-regular" />
                            }
                            sx={{
                                border: `1px solid ${theme.palette.primary.main}`
                            }}
                        >
                            Share
                        </Button>
                    </ButtonGroup>
                    {isEditable &&
                        (savedJobs?.[jobIndex] ? (
                            <Box
                                sx={{
                                    color: theme.palette.primary.main,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <InfinizeIcon icon="mdi-tick" width="18px" />
                                <Typography
                                    className={styles.infinize__jobSavedDetails}
                                >
                                    Saved
                                </Typography>
                            </Box>
                        ) : loadingJob === jobIndex ? (
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <CircularProgress size={20} />
                                <Typography
                                    variant="body2"
                                    color="primary"
                                    className={styles.infinize__jobSavingText}
                                >
                                    Saving...
                                </Typography>
                            </Stack>
                        ) : (
                            <Button onClick={() => handleSaveJob(jobIndex)}>
                                Save
                            </Button>
                        ))}
                </Box>
            </Box>
            <Box className={styles.infinize__jobDetailsRoles}>
                <Typography variant="h3" color="primary">
                    Roles and responsibilities
                </Typography>
                {job.roles.map((role, index) => (
                    <Box
                        key={index}
                        className={styles.infinize__jobDetailsRolesList}
                    >
                        <InfinizeIcon
                            icon="mdi-tick"
                            style={{color: '#656565'}}
                            width="20px"
                        />
                        <Typography variant="body2">{role}</Typography>
                    </Box>
                ))}
            </Box>
            <Grid
                container
                rowGap={4}
                columnGap={2}
                className={styles.infinize__recommendationsCards}
            >
                {Object.entries(Data.careerRecommendations).map(
                    ([category, content]) => (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={5.5}
                            lg={5.7}
                            key={category}
                            className="infinize__recommendationsCard "
                        >
                            <Box>
                                <Typography
                                    variant="h4"
                                    color="primary"
                                    gutterBottom
                                >
                                    {category}
                                </Typography>
                                {category === 'Job Outlook' ? (
                                    <Box>
                                        {/* Image for Job Status */}
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            mb={2}
                                        >
                                            <Box sx={{textAlign: 'center'}}>
                                                <Image
                                                    src="/img/sunIcon.svg"
                                                    alt="Job Outlook"
                                                    width={10}
                                                    height={30}
                                                />
                                                <Typography
                                                    ml={1}
                                                    fontSize={12}
                                                    fontWeight={500}
                                                    className={
                                                        styles.infinize__jobOuttlookStatus
                                                    }
                                                >
                                                    {content.Status}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1" ml={1}>
                                                {content.Description}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6">
                                            Salary:
                                        </Typography>
                                        <Stack spacing={0}>
                                            <Typography
                                                variant="h6"
                                                style={{textAlign: 'center'}}
                                                color="primary"
                                                fontSize={16}
                                            >
                                                $79,440
                                            </Typography>
                                            <Image
                                                src="/img/chart.svg"
                                                width="400"
                                                height="200"
                                                alt="chart-img"
                                                className={
                                                    styles.infinize__recommendationsCardChartImg
                                                }
                                            />
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    fontSize={14}
                                                >
                                                    $50,440
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    fontSize={14}
                                                >
                                                    $137,440
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        {/* <ChartComponent /> */}
                                    </Box>
                                ) : typeof content === 'object' &&
                                  !Array.isArray(content) ? (
                                    Object.entries(content).map(
                                        ([subCategory, subContent]) => (
                                            <Box key={subCategory}>
                                                <Typography
                                                    variant="h5"
                                                    color="primary"
                                                >
                                                    {subCategory}
                                                </Typography>

                                                {Array.isArray(subContent) ? (
                                                    <ul>
                                                        {subContent.map(
                                                            (item, idx) => (
                                                                <li key={idx}>
                                                                    <InfinizeIcon
                                                                        icon="mdi-tick"
                                                                        style={{
                                                                            color: '#656565'
                                                                        }}
                                                                        width="20px"
                                                                    />
                                                                    <Typography variant="body2">
                                                                        {item}
                                                                    </Typography>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                ) : typeof subContent ===
                                                  'object' ? (
                                                    <Box pl={2}>
                                                        {Object.entries(
                                                            subContent
                                                        ).map(
                                                            ([key, value]) => (
                                                                <Typography
                                                                    key={key}
                                                                    variant="body2"
                                                                >
                                                                    <strong>
                                                                        {key}:
                                                                    </strong>{' '}
                                                                    {Array.isArray(
                                                                        value
                                                                    )
                                                                        ? value.join(
                                                                              ', '
                                                                          )
                                                                        : value}
                                                                </Typography>
                                                            )
                                                        )}
                                                    </Box>
                                                ) : (
                                                    <Typography variant="body2">
                                                        {subContent}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )
                                    )
                                ) : (
                                    // Render arrays as lists
                                    <ul>
                                        {content.map((item, idx) => (
                                            <li key={idx}>
                                                <InfinizeIcon
                                                    icon="mdi-tick"
                                                    style={{
                                                        color: '#656565'
                                                    }}
                                                    width="20px"
                                                />
                                                <Typography variant="body2">
                                                    {item}
                                                </Typography>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Box>
                        </Grid>
                    )
                )}
            </Grid>
        </Box>
    );
}
