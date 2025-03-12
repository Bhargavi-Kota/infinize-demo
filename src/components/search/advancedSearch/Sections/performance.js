import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    SelectField,
    NumberField,
    MultiSelectField
} from '@/components/common/form';
import predefinedOptions from '@/data/advancedSearch/performanceOptions.json';
import {performanceLabels} from './labels';
performanceLabels;
export default function Performance({formData, onUpdate, filterChips}) {
    const [semesterOptions, setSemesterOptions] = useState(
        predefinedOptions.semester || []
    );
    const [academicStandingOptions, setAcademicStandingOptions] = useState(
        predefinedOptions.academicStanding || []
    );
    const handleChange = (field, value) => {
        const updatedState = {...formData.performance, [field]: value};

        onUpdate({performance: updatedState});
        filterChips(prev => ({
            ...prev,
            performance: {
                ...prev.performance,
                [field]: performanceLabels?.[field] || field
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
                    Semester
                </Typography>
                <SelectField
                    name="semester"
                    label="Semester"
                    value={formData.performance?.semester}
                    options={semesterOptions}
                    onChange={value => handleChange('semester', value)}
                    helperText={'You must select at least one other criterion.'}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Cumulative GPA
                </Typography>
                <Box display={'flex'} gap={2}>
                    <NumberField
                        name="minCumulativeGPA"
                        label="Min Cumulative GPA"
                        value={formData.performance?.minCumulativeGPA}
                        onChange={value =>
                            handleChange('minCumulativeGPA', value)
                        }
                        placeholder={'Min'}
                    />
                    <NumberField
                        name="maxCumulativeGPA"
                        label="Max Cumulative GPA"
                        value={formData.performance?.maxCumulativeGPA}
                        onChange={value =>
                            handleChange('maxCumulativeGPA', value)
                        }
                        placeholder={'Max'}
                    />
                </Box>
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Term GPA
                </Typography>
                <Box display={'flex'} gap={2}>
                    <NumberField
                        name="minTermGPA"
                        label="Min Term GPA"
                        value={formData.performance?.minTermGPA}
                        onChange={value => handleChange('minTermGPA', value)}
                        placeholder={'Min'}
                    />
                    <NumberField
                        name="maxTermGPA"
                        label="Max Term GPA"
                        value={formData.performance?.maxTermGPA}
                        onChange={value => handleChange('maxTermGPA', value)}
                        placeholder={'Max'}
                    />
                </Box>
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Total Credits Earned
                </Typography>
                <Box display={'flex'} gap={2}>
                    <NumberField
                        name="minTotalCreditsEarned"
                        label="Min Total Credits Earned"
                        value={formData.performance?.minTotalCreditsEarned}
                        onChange={value =>
                            handleChange('minTotalCreditsEarned', value)
                        }
                        placeholder={'Min'}
                    />
                    <NumberField
                        name="maxTotalCreditsEarned"
                        label="Max Total Credits Earned"
                        value={formData.performance?.maxTotalCreditsEarned}
                        onChange={value =>
                            handleChange('maxTotalCreditsEarned', value)
                        }
                        placeholder={'Max'}
                    />
                </Box>
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Total Credits Attempted
                </Typography>
                <Box display={'flex'} gap={2}>
                    <NumberField
                        name="minTotalCreditsAttempted"
                        label="Min High School GPA"
                        value={formData.performance?.minTotalCreditsAttempted}
                        onChange={value =>
                            handleChange('minTotalCreditsAttempted', value)
                        }
                        placeholder={'Min'}
                    />
                    <NumberField
                        name="maxTotalCreditsAttempted"
                        label="Max High School GPA"
                        value={formData.performance?.maxTotalCreditsAttempted}
                        onChange={value =>
                            handleChange('maxTotalCreditsAttempted', value)
                        }
                        placeholder={'Max'}
                    />
                </Box>
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    High School GPA
                </Typography>
                <Box display={'flex'} gap={2}>
                    <NumberField
                        name="minHighSchoolGPA"
                        label="Min High School GPA"
                        value={formData.performance?.minHighSchoolGPA}
                        onChange={value =>
                            handleChange('minHighSchoolGPA', value)
                        }
                        placeholder={'Min'}
                    />
                    <NumberField
                        name="maxHighSchoolGPA"
                        label="Max High School GPA"
                        value={formData.performance?.maxHighSchoolGPA}
                        onChange={value =>
                            handleChange('maxHighSchoolGPA', value)
                        }
                        placeholder={'Max'}
                    />
                </Box>
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Academic Standing
                </Typography>
                <MultiSelectField
                    name="academicStanding"
                    label="Academic Standing"
                    value={formData.performance?.academicStanding}
                    options={academicStandingOptions}
                    onChange={value => handleChange('academicStanding', value)}
                />
            </Box>
        </Box>
    );
}
