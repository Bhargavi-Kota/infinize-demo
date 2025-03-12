import {Box} from '@mui/material';
import classes from '@/components/coursePlan/coursePlan.module.css';
import StudentDetails from '@/components/studentDetails';

export default function StudentLayout({children}) {
    return (
        <Box component="main" sx={{overflow: 'hidden'}}>
            <StudentDetails />
            <Box className={classes.infinize__coursePlan}>{children}</Box>
        </Box>
    );
}
