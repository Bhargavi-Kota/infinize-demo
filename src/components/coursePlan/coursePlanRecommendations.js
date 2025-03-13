import {Box, Stack, Typography} from '@mui/material';
import CoursePlanCard from './coursePlanCard';
import Recommendations from './recommendations';
import classes from './coursePlan.module.css';
export default function CoursePlanRecommendations({loading}) {
    return (
        <Box className={classes.infinize__coursePlanRecommendationsPage}>
            <Typography variant="h2" color="primary">
                Course Plan Recommendations
            </Typography>

            <Box
                className={classes.infinize__coursePlanRecommendationsAlignment}
            >
                <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
                    <CoursePlanCard loader={loading} isEditable={true} />
                    <Recommendations loader={loading} />
                </Stack>
            </Box>
        </Box>
    );
}
