'use client';
import {useState, useEffect} from 'react';
import {Typography, Box} from '@mui/material';
import classes from './createCoursePlan.module.css';
import CoursePlanForm from './coursePlanForm';
import {FormProvider} from '../../common/form/formProvider.js';
import CoursePlanRecommendations from '../coursePlanRecommendations';
import LoaderDialog from '@/components/common/loaderDialog';

export default function CreateCourseplan({onCreate}) {
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShowRecommendations = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowRecommendations(true);
        }, 1500);
    };
    useEffect(() => {
        if (showRecommendations) {
            window.scrollTo(0, 0);
        }
    }, [showRecommendations]);

    return showRecommendations ? (
        <CoursePlanRecommendations />
    ) : (
        <Box className={classes.infinize__createCoursePlan__container}>
            {loading && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <LoaderDialog open={loading} />
                </Box>
            )}
            <Typography
                variant="h5"
                gutterBottom
                color="primary.main"
                className={classes.infinize__createCoursePlan__title}
            >
                Create a Customized Course Plan
            </Typography>
            <FormProvider>
                <CoursePlanForm onCreate={handleShowRecommendations} />
            </FormProvider>
        </Box>
    );
}
