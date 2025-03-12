import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    MultiSelectField,
    SelectField,
    TextInput
} from '@/components/common/form';
import predefinedOptions from '@/data/coursePlan/form/careerGoals.json';
import {useFormContext} from '@/components/common/form/formProvider';
import {MultiAutocomplete} from '@/components/common/form/multiAutocompleat';

export function CareerGoalsSection({formData}) {
    const {setFormData, handleChange} = useFormContext();
    const [careerAspirations, setCareerAspirations] = useState([]);
    const [desiredCourseLoad, setDesiredCourseLoad] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [internshipGoals, setInternshipGoals] = useState([]);
    const [salaryExpectations, setSalaryExpectations] = useState([]);

    useEffect(() => {
        setCareerAspirations(predefinedOptions.careerAspirations);
        setDesiredCourseLoad(predefinedOptions.desiredCourseLoad);
        setCertifications(predefinedOptions.certifications);
        setInternshipGoals(predefinedOptions.internshipGoals);
        setSalaryExpectations(predefinedOptions.salaryExpectations);
    }, []);

    //     onUpdate({areaOfStudySection: updatedState});
    // };
    return (
        <Box sx={{mb: 4}}>
            <Typography
                color="primary.main"
                mb={2}
                fontSize={'18px'}
                fontWeight={'500'}
            >
                Career Goals
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                gap={3}
            >
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Career Aspirations
                    </Typography>
                    <MultiAutocomplete
                        id="careerAspirations"
                        name="careerAspirations"
                        label="Career Aspirations"
                        value={formData.careerAspirations}
                        options={careerAspirations}
                        onChange={value =>
                            handleChange('careerAspirations', value)
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
                        Desired Course Load
                    </Typography>
                    <MultiSelectField
                        id="desiredCourseLoad"
                        name="desiredCourseLoad"
                        label="Desired Course Load"
                        value={formData.desiredCourseLoad}
                        options={desiredCourseLoad}
                        onChange={value =>
                            handleChange('desiredCourseLoad', value)
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
                        Certifications
                    </Typography>
                    <MultiSelectField
                        id="certifications"
                        name="certifications"
                        label="Certifications"
                        value={formData.certifications}
                        options={certifications}
                        onChange={value =>
                            handleChange('certifications', value)
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
                        Internship/Co-Op Goals
                    </Typography>
                    <SelectField
                        id="internshipGoals"
                        name="internshipGoals"
                        label="Internship/Co-Op Goals"
                        value={formData.internshipGoals}
                        options={internshipGoals}
                        onChange={value =>
                            handleChange('internshipGoals', value)
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
                        Salary Expectations
                    </Typography>
                    <SelectField
                        id="salaryExpectations"
                        name="salaryExpectations"
                        label="Salary Expectations"
                        value={formData.salaryExpectations}
                        options={salaryExpectations}
                        onChange={value =>
                            handleChange('salaryExpectations', value)
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
