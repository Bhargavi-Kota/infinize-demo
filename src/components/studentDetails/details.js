'use client';
import {Box, Skeleton, Typography} from '@mui/material';
import classes from './studentDetails.module.css';
import Image from 'next/image';
import StudentInfo from './studentInfo';
import dynamic from 'next/dynamic';

export default function Details({studentInfo, isLoading}) {
    const CreditsWidget = dynamic(() => import('./credits'), {
        ssr: false
    });

    return (
        <Box className={classes.infinize__studentDetails}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    gap: 3
                }}
            >
                {isLoading && <Skeleton width="100%" height={98} />}
                {!isLoading && studentInfo && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: 3,
                            width: '100%',
                            borderRight: '1px solid #EBF2FD'
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color="primary"
                        >
                            Student Details
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2
                            }}
                        >
                            <Image
                                src={studentInfo.photo}
                                alt="Student Profile"
                                width={95}
                                height={95}
                            />
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="primary"
                                    mb={2}
                                >
                                    {studentInfo.name}
                                </Typography>
                                <StudentInfo studentInfo={studentInfo} />
                            </Box>
                        </Box>
                    </Box>
                )}
                {isLoading && <Skeleton width="10%" height={98} />}

                {!isLoading && studentInfo && (
                    <Box
                        sx={{
                            minWidth: 180,
                            textAlign: 'center'
                        }}
                    >
                        <CreditsWidget />
                    </Box>
                )}
            </Box>
        </Box>
    );
}
