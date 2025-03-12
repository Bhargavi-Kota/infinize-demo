'use client';
import React, {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import classes from './career.module.css';
import {
    PastPositionsInternships,
    Skills,
    CareerGoalsAndInterests,
    ProjectsOrPortfolioLinks,
    LocationAndWorkEnvironmentPreferences,
    ConstraintsAndPracticalConsiderations,
    AdditionalAndPreferences,
    CertificationsAndLicenses
} from './sections';
import LoaderDialog from '../common/loaderDialog';
export default function CareerForm({
    updateSectionData,
    formData,
    ShowRecomendations
}) {
    const [loading, setLoading] = useState(false);

    const handleCreate = () => {
        console.log('Form submitted:', formData);

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            ShowRecomendations();
        }, 3000);
    };
    const isSearchDisabled = !Object.values(formData).some(section =>
        (Array.isArray(section) ? section : [section]).some(obj =>
            obj && typeof obj === 'object'
                ? Object.values(obj).some(
                      value =>
                          value &&
                          value !== 0 &&
                          !(
                              Array.isArray(value) &&
                              (value.length === 0 ||
                                  value.every(v => v === null))
                          )
                  )
                : obj && obj !== 0
        )
    );
    return (
        <Box className={classes.infinize__career__container}>
            <Typography
                variant="h5"
                gutterBottom
                color="primary.main"
                className={classes.infinize__career__title}
            >
                Create a personalized career recommendations
            </Typography>
            <Box sx={{p: 3}} component="form" noValidate autoComplete="off">
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                    <PastPositionsInternships
                        onUpdate={updateSectionData}
                        formData={formData}
                    />
                    <Skills onUpdate={updateSectionData} formData={formData} />
                    <CertificationsAndLicenses
                        onUpdate={updateSectionData}
                        formData={formData}
                    />
                    <ProjectsOrPortfolioLinks
                        onUpdate={updateSectionData}
                        formData={formData}
                    />
                    <CareerGoalsAndInterests
                        onUpdate={updateSectionData}
                        formData={formData}
                    />

                    <LocationAndWorkEnvironmentPreferences
                        onUpdate={updateSectionData}
                        formData={formData}
                    />

                    <ConstraintsAndPracticalConsiderations
                        onUpdate={updateSectionData}
                        formData={formData}
                    />
                    <AdditionalAndPreferences
                        onUpdate={updateSectionData}
                        formData={formData}
                    />
                    <Box width={'45%'}>
                        <Button
                            variant="contained"
                            disabled={isSearchDisabled}
                            onClick={handleCreate}
                            className={classes.infinize__carrer__Buttons}
                            sx={{textTransform: 'none'}}
                        >
                            Continue
                        </Button>
                    </Box>
                    {loading && (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <LoaderDialog open={loading} />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
