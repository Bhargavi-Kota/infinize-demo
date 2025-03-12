import {Box} from '@mui/material';
import {InfinizeIcon} from '@/components/common';

export const currentEnrollmentColumns = [
    {
        field: 'status',
        headerName: 'Status',
        width: 90,
        renderCell: () => (
            <Box display="flex" alignItems="center" mt={'10px'}>
                <InfinizeIcon icon="hugeicons:analytics-02" />
            </Box>
        )
    },
    {field: 'crn', headerName: 'CRN', width: 90},
    {field: 'subject', headerName: 'Subject', width: 130},
    {field: 'courseNumber', headerName: 'Course Number', width: 150},
    {field: 'title', headerName: 'Title', flex: 1, minWidth: 230},
    {field: 'instructor', headerName: 'Instructor', flex: 1, minWidth: 180},
    {field: 'courseCredits', headerName: 'Course Credits', width: 150},
    {
        field: 'schedule',
        headerName: 'Schedule',
        flex: 1,
        minWidth: 200,
        renderCell: params => (
            <Box sx={{whiteSpace: 'pre-wrap', lineHeight: 1.5}}>
                {Array.isArray(params.value)
                    ? params.value.join('\n')
                    : params.value}
            </Box>
        )
    }
];

export const holdsColumns = [
    {field: 'title', headerName: 'Title', flex: 1, minWidth: 200},
    {field: 'holdReason', headerName: 'Hold Reason', flex: 1, minWidth: 150},
    {field: 'from', headerName: 'From', flex: 1, minWidth: 150},
    {field: 'to', headerName: 'To', flex: 1, minWidth: 150}
];

export const creditsCompletedColumns = [
    {field: 'semester', headerName: 'Semester', flex: 1, minWidth: 150},
    {field: 'earned', headerName: 'Earned', flex: 1, minWidth: 150},
    {field: 'completed', headerName: 'Completed', flex: 1, minWidth: 150}
];

export const housingColumns = [
    {field: 'building', headerName: 'Building', flex: 1, minWidth: 200},
    {field: 'from', headerName: 'From', flex: 1, minWidth: 200},
    {field: 'to', headerName: 'To', flex: 1, minWidth: 200}
];

export const majorChangeHistoryColumns = [
    {field: 'major', headerName: 'Major', flex: 1, minWidth: 200},
    {field: 'semester', headerName: 'Semester', width: 200}
];
