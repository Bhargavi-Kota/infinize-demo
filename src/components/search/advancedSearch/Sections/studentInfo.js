import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    SelectField,
    TextInput,
    MultiSelectField,
    DateFieldComponent
} from '../../../common/form';
import studentInfoOptions from '@/data/advancedSearch/studentInfoOptions.json';
import {studentInfoFields} from './labels';

export default function StudentInfo({onUpdate, formData, filterChips}) {
    const [raceEthnicityOptions, setRaceEthnicityOptions] = useState(
        studentInfoOptions.raceEthnicity || []
    );
    const [cohortOptions, setCohortOptions] = useState(
        studentInfoOptions.cohort || []
    );
    const [studentTypeOptions, setStudentTypeOptions] = useState(
        studentInfoOptions.studentType || []
    );
    const [commonOptions] = useState(['Yes', 'No']);

    const handleFieldChange = (field, value) => {
        const updatedState = {...formData.studentInfo, [field]: value};

        onUpdate({studentInfo: updatedState});
        filterChips(prev => ({
            ...prev,
            studentInfo: {
                ...prev.studentInfo,
                [field]: studentInfoFields?.[field] || field
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
                    Student Identifier
                </Typography>
                <TextInput
                    name="studentIdentifier"
                    label="Student Identifier"
                    value={formData.studentInfo?.studentIdentifier}
                    onChange={val =>
                        handleFieldChange('studentIdentifier', val)
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
                    Email
                </Typography>
                <TextInput
                    name="email"
                    label="Email"
                    value={formData.studentInfo?.email}
                    onChange={val => handleFieldChange('email', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    First Name
                </Typography>
                <TextInput
                    name="firstName"
                    label="First Name"
                    value={formData.studentInfo?.firstName}
                    onChange={val => handleFieldChange('firstName', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Last Name
                </Typography>
                <TextInput
                    name="lastName"
                    label="Last Name"
                    value={formData.studentInfo?.lastName}
                    onChange={val => handleFieldChange('lastName', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Gender
                </Typography>
                <SelectField
                    name="gender"
                    label="Gender"
                    value={formData.studentInfo?.gender}
                    options={['Male', 'Female', 'Other', 'Prefer not to say']}
                    onChange={val => handleFieldChange('gender', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Race/Ethnicity
                </Typography>
                <MultiSelectField
                    name="raceEthnicity"
                    label="Race/Ethnicity"
                    value={formData.studentInfo?.raceEthnicity}
                    options={raceEthnicityOptions}
                    onChange={val => handleFieldChange('raceEthnicity', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Cohort
                </Typography>
                <MultiSelectField
                    name="cohort"
                    label="Cohort"
                    value={formData.studentInfo?.cohort}
                    options={cohortOptions}
                    onChange={val => handleFieldChange('cohort', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Student Type
                </Typography>
                <MultiSelectField
                    name="studentType"
                    label="Student Type"
                    value={formData.studentInfo?.studentType}
                    options={studentTypeOptions}
                    onChange={val => handleFieldChange('studentType', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    First Generation
                </Typography>
                <SelectField
                    name="firstGeneration"
                    label="First Generation"
                    value={formData.studentInfo?.firstGeneration}
                    options={commonOptions}
                    onChange={val => handleFieldChange('firstGeneration', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Military
                </Typography>
                <SelectField
                    name="military"
                    label="Military"
                    value={formData.studentInfo?.military}
                    options={commonOptions}
                    onChange={val => handleFieldChange('military', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Athlete
                </Typography>
                <SelectField
                    name="athlete"
                    label="Athlete"
                    value={formData.studentInfo?.athlete}
                    options={commonOptions}
                    onChange={val => handleFieldChange('athlete', val)}
                />
            </Box>
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Active Holds As Of
                </Typography>
                <DateFieldComponent
                    name="activeHoldsAsOf"
                    label="Active Holds As Of"
                    value={formData.studentInfo?.activeHoldsAsOf}
                    onChange={val => handleFieldChange('activeHoldsAsOf', val)}
                />
            </Box>
        </Box>
    );
}
