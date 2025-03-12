'use client';
import React, {useEffect} from 'react';
import {Box, Typography, Button} from '@mui/material';
import classes from './createCoursePlan.module.css';
import {
    CareerGoalsSection,
    AcademicConstraintsSection,
    LearningPersonalizationSection,
    PersonalInterestsSection
} from './formSections';
import {useRouter} from 'next/navigation';
import {useFormContext} from '../../common/form/formProvider';

export default function CoursePlanForm({onCreate}) {
    const {formData} = useFormContext();
    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCreate = () => {
        console.log('Form submitted:', formData);
        // TODO note here to update the logic when integrating with API.
    };

    const handleCancel = () => {
        router.back();
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
    const handleClick = () => {
        handleCreate();
        onCreate();
    };
    return (
        <Box sx={{p: 3}} component="form" noValidate autoComplete="off">
            <Typography mb={3} fontSize={'20px'} fontWeight={'500'}>
                Student Preferences:
            </Typography>
            <CareerGoalsSection formData={formData} />
            <AcademicConstraintsSection formData={formData} />
            <LearningPersonalizationSection formData={formData} />
            <PersonalInterestsSection formData={formData} />

            <Box
                display={{xs: 'block', sm: 'flex'}}
                justifyContent={'flex-start'}
                mt={4}
                gap={2}
            >
                <Button
                    variant="contained"
                    onClick={handleClick}
                    className={classes.infinize__createCoursePlan__Buttons}
                    disabled={isSearchDisabled}
                    sx={{textTransform: 'none'}}
                >
                    Create Plan
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    onClick={handleCancel}
                    className={classes.infinize__createCoursePlan__Buttons}
                    sx={{textTransform: 'none'}}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}
