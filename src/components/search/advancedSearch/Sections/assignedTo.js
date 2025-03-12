import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {SelectField} from '@/components/common/form';
import predefinedOptions from '@/data/advancedSearch/assignedToOptions.json';
import {assignedTo} from './labels';

export default function AssignedTo({formData, onUpdate, filterChips}) {
    const [localState, setLocalState] = useState({});

    const [advisorOptions, setAdvisorOptions] = useState(
        predefinedOptions.advisor || []
    );
    const [coachOptions, setCoachOptions] = useState(
        predefinedOptions.coach || []
    );
    const [instructorOptions, setInstructorOptions] = useState(
        predefinedOptions.instructor || []
    );

    const handleChange = (field, value) => {
        const updatedState = {...formData.assignedTo, [field]: value};

        onUpdate({assignedTo: updatedState});
        filterChips(prev => ({
            ...prev,
            assignedTo: {
                ...prev.assignedTo,
                [field]: assignedTo?.[field] || field
            }
        }));
    };
    return (
        <Box
            display="grid"
            gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
            gap={3}
            mt={1}
        >
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Advisor
                </Typography>
                <SelectField
                    name="advisor"
                    label="Advisor"
                    value={formData.assignedTo?.advisor}
                    options={advisorOptions}
                    onChange={value => handleChange('advisor', value)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Coach
                </Typography>
                <SelectField
                    name="coach"
                    label="Coach"
                    value={formData.assignedTo?.coach}
                    options={coachOptions}
                    onChange={value => handleChange('coach', value)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Instructor
                </Typography>
                <SelectField
                    name="instructor"
                    label="Instructor"
                    value={formData.assignedTo?.instructor}
                    options={instructorOptions}
                    onChange={value => handleChange('instructor', value)}
                />
            </Box>
        </Box>
    );
}
