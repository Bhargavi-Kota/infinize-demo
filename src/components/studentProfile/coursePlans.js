'use client';
import {useEffect, useState} from 'react';
import {useParams, usePathname} from 'next/navigation';
import {Box, Skeleton} from '@mui/material';
import {Widget} from '../common/';
import NoPlan from '../common/noPlan';
import CoursePlanPage from '@/components/coursePlan/coursePlans';
import {useRoute} from '@/context/route';

export default function CoursePlans({isLoading = true}) {
    const {studentId} = useParams();
    const pathname = usePathname();
    // const {prevRoute} = useRoute();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        window.scrollTo(0, 0);
    }, []);

    const [hasCoursePlan, setHasCoursePlan] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('hasCoursePlan') === 'true';
        }
        return false;
    });

    const isProfileRoute = pathname === `/student/${studentId}`;
    const showNoPlan = !hasCoursePlan && isProfileRoute;

    const handleAddCourse = () => {
        console.log('Add course');
    };

    const [expanded, setExpanded] = useState({
        coursePlans: true
    });
    const handleAccordionChange = panel => () => {
        setExpanded(prev => ({
            ...prev,
            [panel]: !prev[panel]
        }));
    };

    return (
        <Box>
            {mounted ? (
                isLoading ? (
                    <Skeleton variant="rectangular" width="100%" height={300} />
                ) : (
                    <Widget
                        expanded={expanded.coursePlans}
                        onChange={handleAccordionChange('coursePlans')}
                        title="Course Plans"
                        button={
                            showNoPlan
                                ? null
                                : {type: 'course', onCreate: handleAddCourse}
                        }
                    >
                        <Box>
                            {showNoPlan ? (
                                <NoPlan
                                    title="There are no course plans"
                                    description="Get started by creating a new plan."
                                    button="Create Plan"
                                    link={`/student/${studentId}/coursePlan`}
                                />
                            ) : (
                                <CoursePlanPage sx={{pt: 0}} />
                            )}
                        </Box>
                    </Widget>
                )
            ) : null}
        </Box>
    );
}
