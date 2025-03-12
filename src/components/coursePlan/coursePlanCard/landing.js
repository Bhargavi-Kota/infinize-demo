import {Card, CardContent, Typography, Box, Stack} from '@mui/material';
import classes from '../coursePlan.module.css';

export default function CoursePlanLanding({term}) {
    return (
        <Box className={classes.infinize__coursePlanLandingCard}>
            <Box className={classes.infinize__coursePlanTermHeading}>
                <Typography variant="h6">
                    {term.term || 'Unknown Term'}
                </Typography>
                <Typography variant="subtitle1">
                    Total Credits: {term.termCredits ?? 0}
                </Typography>
            </Box>
            <Stack spacing={2}>
                {term.courses?.map((course, idx) => (
                    <Box
                        key={idx}
                        className={classes.infinize__coursePlanCourseItem}
                    >
                        <Typography variant="h6" fontWeight="bold">
                            {course.name}
                        </Typography>
                        <Typography variant="body2">
                            {course.description}
                        </Typography>
                        <Typography variant="body2">
                            Credits: {course.credits ?? 'N/A'}
                        </Typography>
                    </Box>
                )) ?? <Typography>No courses available</Typography>}
            </Stack>
        </Box>
    );
}
