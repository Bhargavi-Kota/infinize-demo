import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {MultiSelectField, SelectField} from '@/components/common/form';
import Options from '@/data/careerRecomendation/careerGoalsAndInterests.json';

export function CareerGoalsAndInterests({formData, onUpdate}) {
    const [desiredIndustries, setDesiredIndustries] = useState(
        Options.desiredIndustries || []
    );
    const [desiredRoles, setDesiredRole] = useState(Options.desiredRoles || []);
    const [careerFocus, setCareerFocus] = useState(Options.careerFocus || []);
    const [salaryExpectations, setSalaryExpectations] = useState(
        Options.salaryExpectation || []
    );
    const [organization, setOrganization] = useState(
        Options.organization || []
    );

    const handleChange = (field, value) => {
        const updatedState = {
            ...formData.careerGoalsAndInterests,
            [field]: value
        };

        onUpdate({careerGoalsAndInterests: updatedState});
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
                Career Goals & Interests
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
                        Desired Industries
                    </Typography>
                    <MultiSelectField
                        name="desiredIndustries"
                        label="Desired Industries"
                        value={
                            formData.careerGoalsAndInterests?.desiredIndustries
                        }
                        options={desiredIndustries}
                        onChange={value =>
                            handleChange('desiredIndustries', value)
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
                        Desired Roles / Job Titles
                    </Typography>
                    <MultiSelectField
                        name="desiredRoles"
                        label="Desired Roles / Job Titles"
                        value={formData.careerGoalsAndInterests?.desiredRoles}
                        options={desiredRoles}
                        onChange={value => handleChange('desiredRoles', value)}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Career Focus
                    </Typography>
                    <SelectField
                        name="careerFocus"
                        label="Career Focus"
                        value={formData.careerGoalsAndInterests?.careerFocus}
                        options={careerFocus}
                        onChange={value => handleChange('careerFocus', value)}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Salary Expectations
                    </Typography>
                    <SelectField
                        name="salaryExpectations"
                        label="Salary Expectations"
                        value={
                            formData.careerGoalsAndInterests?.salaryExpectations
                        }
                        options={salaryExpectations}
                        onChange={value =>
                            handleChange('salaryExpectations', value)
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
                        Preferred Organization Type
                    </Typography>
                    <MultiSelectField
                        name="preferredOrganizationType"
                        label="Preferred Organization Type"
                        value={
                            formData.careerGoalsAndInterests
                                ?.preferredOrganizationType
                        }
                        options={organization}
                        onChange={value =>
                            handleChange('preferredOrganizationType', value)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
