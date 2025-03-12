'use client';
import React, {useState} from 'react';
import {Box, Tabs, Tab, Typography, Skeleton} from '@mui/material';
import {InfinizeTable} from '../../common/infinizeTable';
import cleasses from '../profile.module.css';
import {currentEnrollmentColumns} from './tableColumns';
import data from '@/data/studentProfile/tableData.json';

export function EnrollmentDetails({title, isLoading = true}) {
    const [activeTab, setActiveTab] = useState(0);
    const [tableData, setTableData] = useState(data.currentEnrollment || []);

    const handleChange = (event, newValue) => setActiveTab(newValue);

    return (
        <Box
            sx={{width: '100%'}}
            className={cleasses.infinize__enrollmentContainer}
        >
            <Tabs
                value={activeTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                className={cleasses.infinize__enrollmentBorder}
            >
                <Tab
                    label="Current Enrollment"
                    sx={{textTransform: 'none', color: '#808A98'}}
                />
                <Tab
                    label="Enrollment History"
                    sx={{textTransform: 'none', color: '#808A98'}}
                />
                <Tab
                    label="Course Analytics"
                    sx={{textTransform: 'none', color: '#808A98'}}
                />
                <Tab
                    label="Interaction Summary"
                    sx={{textTransform: 'none', color: '#808A98'}}
                />
            </Tabs>

            {activeTab === 0 && (
                <>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            mt: 2,
                            ml: 2,
                            color: 'primary.main'
                        }}
                    >
                        {title}
                    </Typography>
                    {isLoading ? (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={200}
                        />
                    ) : (
                        <InfinizeTable
                            columns={currentEnrollmentColumns}
                            rows={tableData}
                        />
                    )}
                </>
            )}
            {activeTab === 1 && (
                <Typography variant="h6" sx={{mt: 2}}>
                    {isLoading ? (
                        <Skeleton width="100%" />
                    ) : (
                        'Enrollment History content'
                    )}
                </Typography>
            )}
            {activeTab === 2 && (
                <Typography variant="h6" sx={{mt: 2}}>
                    {isLoading ? (
                        <Skeleton width="100%" />
                    ) : (
                        'Course Analytics content'
                    )}
                </Typography>
            )}
            {activeTab === 3 && (
                <Typography variant="h6" sx={{mt: 2}}>
                    {isLoading ? (
                        <Skeleton width="100%" />
                    ) : (
                        'Interaction Summary content'
                    )}
                </Typography>
            )}
        </Box>
    );
}
