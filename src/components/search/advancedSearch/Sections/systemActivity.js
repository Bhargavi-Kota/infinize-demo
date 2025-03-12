import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    MultiSelectField,
    DateRangePickerComponent,
    CheckboxComponent
} from '../../../common/form';
import systemActivityOptions from '@/data/advancedSearch/systemActivityOptions.json';
import {systemActivity} from './labels';

export default function SystemActivity({onUpdate, formData, filterChips}) {
    const [systemOptions, setSystemOptions] = useState(
        systemActivityOptions.system ?? []
    );

    const handleFieldChange = (field, value) => {
        const updatedState = {...formData.systemActivity, [field]: value};

        onUpdate({systemActivity: updatedState});
        filterChips(prev => ({
            ...prev,
            systemActivity: {
                ...prev.systemActivity,
                [field]: systemActivity?.[field] || field
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
                    System
                </Typography>
                <MultiSelectField
                    name="system"
                    label="System"
                    value={formData.systemActivity?.system}
                    options={systemOptions}
                    onChange={val => handleFieldChange('system', val)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Date Range
                </Typography>
                <DateRangePickerComponent
                    name="dateRange"
                    label="Date Range"
                    value={formData.systemActivity?.dateRange}
                    onChange={handleFieldChange}
                />
            </Box>

            <Box>
                <CheckboxComponent
                    name="noActivity"
                    label="No Activity"
                    value={formData.systemActivity?.noActivity}
                    onChange={val => handleFieldChange('noActivity', val)}
                />
            </Box>
        </Box>
    );
}
