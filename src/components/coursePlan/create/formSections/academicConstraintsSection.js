import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    MultiSelectField,
    SelectField,
    CheckboxGroup,
    RadioGroupField
} from '@/components/common/form';
import predefinedOptions from '@/data/coursePlan/form/academicConstraints.json';
import {useFormContext} from '@/components/common/form/formProvider';

export function AcademicConstraintsSection({formData}) {
    const {setFormData, handleChange} = useFormContext();

    const [strengths, setStrengths] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const [financialConstraints, setFinancialConstraints] = useState([]);
    const [desiredGraduationTerm, setDesiredGraduationTerm] = useState([]);
    const [locationConstraints, setLocationConstraints] = useState([]);

    useEffect(() => {
        setStrengths(predefinedOptions.strengths);
        setChallenges(predefinedOptions.challenges);
        setFinancialConstraints(predefinedOptions.financialConstraints);
        setDesiredGraduationTerm(predefinedOptions.desiredGraduationTerms);
        setLocationConstraints(predefinedOptions.locationConstraints);
    }, []);

    return (
        <Box sx={{mb: 4}}>
            <Typography
                color="primary.main"
                mb={2}
                fontSize={'18px'}
                fontWeight={'500'}
            >
                Academic Constraints
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', md: '1fr 1fr'}}
                gap={3}
                mb={2}
            >
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Strengths
                    </Typography>
                    <MultiSelectField
                        id="strengths"
                        name="strengths"
                        label="Strengths"
                        value={formData.strengths}
                        options={strengths}
                        onChange={value => handleChange('strengths', value)}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Challenges
                    </Typography>
                    <MultiSelectField
                        id="challenges"
                        name="challenges"
                        label="Challenges"
                        value={formData.challenges}
                        options={challenges}
                        onChange={value => handleChange('challenges', value)}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Schedule Preferences
                    </Typography>
                    <CheckboxGroup
                        id="schedulePreferences"
                        name="schedulePreferences"
                        label="Schedule Preferences"
                        setFormData={setFormData}
                        formData={formData}
                        value={formData.schedulePreferences}
                        options={[
                            'Mornings',
                            'Afternoons',
                            'Evenings',
                            'Weekdays',
                            'Weekends'
                        ]}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Course Load Preferences
                    </Typography>
                    <RadioGroupField
                        id="courseLoadPreferences"
                        name="courseLoadPreferences"
                        label="Course Load Preferences"
                        value={formData.courseLoadPreferences}
                        options={['Full-Time', 'Part-Time']}
                        onChange={value =>
                            handleChange('courseLoadPreferences', value)
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
                        Financial Constraints
                    </Typography>
                    <MultiSelectField
                        id="financialConstraints"
                        name="financialConstraints"
                        label="Financial Constraints"
                        value={formData.financialConstraints}
                        options={financialConstraints}
                        onChange={value =>
                            handleChange('financialConstraints', value)
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
                        Location Constraints
                    </Typography>
                    <MultiSelectField
                        id="locationConstraints"
                        name="locationConstraints"
                        label="Location Constraints"
                        value={formData.locationConstraints}
                        options={locationConstraints}
                        onChange={value =>
                            handleChange('locationConstraints', value)
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
                        Desired Graduation Term
                    </Typography>
                    <SelectField
                        id="desiredGraduationTerm"
                        name="desiredGraduationTerm"
                        label="Desired GraduationTerm"
                        value={formData.desiredGraduationTerm}
                        options={desiredGraduationTerm}
                        onChange={value =>
                            handleChange('desiredGraduationTerm', value)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
