import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {MultiSelectField, SelectField} from '@/components/common/form';
import Options from '@/data/careerRecomendation/locationAndWorkEnvironmentPreferences.json';

export function LocationAndWorkEnvironmentPreferences({formData, onUpdate}) {
    const [locationPreferences, setLocationPreferences] = useState(
        Options.locationPreferences || []
    );
    const [willingnesstoRelocate, setWillingnesstoRelocate] = useState([
        'Yes',
        'No'
    ]);
    const [workFormat, setWorkFormat] = useState(Options.workFormat || []);
    const [workHoursAvailability, setWorkHoursAvailability] = useState(
        Options.workHoursAvailability || []
    );

    const handleChange = (field, value) => {
        const updatedState = {
            ...formData.locationAndWorkEnvironmentPreferences,
            [field]: value
        };

        onUpdate({locationAndWorkEnvironmentPreferences: updatedState});
    };
    return (
        <Box mt={2} display="flex" flexDirection="column" gap={1}>
            <Typography
                fontSize="16px"
                fontWeight="500"
                gutterBottom
                mb={1}
                color="primary.main"
            >
                Location & Work Environment Preferences
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                gap={3}
                p={3}
                className="border"
            >
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Location Preferences
                    </Typography>
                    <SelectField
                        name="locationPreferences"
                        label="Location Preferences"
                        value={
                            formData.locationAndWorkEnvironmentPreferences
                                ?.locationPreferences
                        }
                        options={locationPreferences}
                        onChange={value =>
                            handleChange('locationPreferences', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Willingness to Relocate
                    </Typography>
                    <SelectField
                        name="willingnesstoRelocate"
                        label="Willingness to Relocate"
                        value={
                            formData.locationAndWorkEnvironmentPreferences
                                ?.willingnesstoRelocate
                        }
                        options={willingnesstoRelocate}
                        onChange={value =>
                            handleChange('willingnesstoRelocate', value)
                        }
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Work Format
                    </Typography>
                    <MultiSelectField
                        name="workFormat"
                        label="Work Format"
                        value={
                            formData.locationAndWorkEnvironmentPreferences
                                ?.workFormat
                        }
                        options={workFormat}
                        onChange={value => handleChange('workFormat', value)}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Work Hours Availability
                    </Typography>
                    <MultiSelectField
                        name="workHoursAvailability"
                        label="Work Hours Availability"
                        value={
                            formData.locationAndWorkEnvironmentPreferences
                                ?.workHoursAvailability
                        }
                        options={workHoursAvailability}
                        onChange={value =>
                            handleChange('workHoursAvailability', value)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
