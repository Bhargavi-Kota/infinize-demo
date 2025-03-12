import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    MultiSelectField,
    SelectField,
    CheckboxComponent
} from '@/components/common/form';
import predefinedAreaOfStudyOptions from '@/data/advancedSearch/areaOfStudyOptions.json';
import {areaOfStudy} from './labels';

export default function AreaOfStudy({formData, onUpdate, filterChips}) {
    const [semesterOptions, setSemesterOptions] = useState(
        predefinedAreaOfStudyOptions.semester || []
    );
    const [collegeOptions, setCollegeOptions] = useState(
        predefinedAreaOfStudyOptions.college || []
    );
    const [departmentOptions, setDepartmentOptions] = useState(
        predefinedAreaOfStudyOptions.department || []
    );
    const [levelOptions, setLevelOptions] = useState(
        predefinedAreaOfStudyOptions.level || []
    );
    const [degreeOptions, setDegreeOptions] = useState(
        predefinedAreaOfStudyOptions.degree || []
    );
    const [majorOptions, setMajorOptions] = useState(
        predefinedAreaOfStudyOptions.major || []
    );
    const [minorOptions, setMinorOptions] = useState(
        predefinedAreaOfStudyOptions.minor || []
    );
    const [programOptions, setProgramOptions] = useState(
        predefinedAreaOfStudyOptions.program || []
    );
    const [concentrationOptions, setConcentrationOptions] = useState(
        predefinedAreaOfStudyOptions.concentration || []
    );
    const handleChange = (field, value) => {
        const updatedState = {...formData.areaOfStudy, [field]: value};

        onUpdate({areaOfStudy: updatedState});
        filterChips(prev => ({
            ...prev,
            areaOfStudy: {
                ...prev.areaOfStudy,
                [field]: areaOfStudy?.[field] || field
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
                <MultiSelectField
                    name="semester"
                    label="Semester"
                    value={formData.areaOfStudy?.semester}
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
                    College
                </Typography>
                <MultiSelectField
                    name="college"
                    label="College"
                    value={formData.areaOfStudy?.college}
                    options={collegeOptions}
                    onChange={value => handleChange('college', value)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Department
                </Typography>
                <MultiSelectField
                    name="department"
                    label="Department"
                    value={formData.areaOfStudy?.department}
                    options={departmentOptions}
                    onChange={value => handleChange('department', value)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Level
                </Typography>
                <SelectField
                    name="level"
                    label="Level"
                    value={formData.areaOfStudy?.level}
                    options={levelOptions}
                    onChange={value => handleChange('level', value)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Degree
                </Typography>
                <MultiSelectField
                    name="degree"
                    label="Degree"
                    value={formData.areaOfStudy?.degree}
                    options={degreeOptions}
                    onChange={value => handleChange('degree', value)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Major
                </Typography>
                <MultiSelectField
                    name="major"
                    label="Major"
                    value={formData.areaOfStudy?.major}
                    options={majorOptions}
                    onChange={value => handleChange('major', value)}
                />
                <CheckboxComponent
                    label="Primary Major Only"
                    name="primaryMajorOnly"
                    value={formData.areaOfStudy?.primaryMajorOnly}
                    onChange={val => handleChange('primaryMajorOnly', val)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Minor
                </Typography>
                <MultiSelectField
                    name="minor"
                    label="Minor"
                    value={formData.areaOfStudy?.minor || []}
                    options={minorOptions}
                    onChange={value => handleChange('minor', value)}
                />
                <CheckboxComponent
                    label="Primary Minor Only"
                    name="primaryMinorOnly"
                    value={formData.areaOfStudy?.primaryMinorOnly}
                    onChange={val => handleChange('primaryMinorOnly', val)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Program
                </Typography>
                <MultiSelectField
                    name="program"
                    label="Program"
                    value={formData.areaOfStudy?.program || []}
                    options={programOptions}
                    onChange={value => handleChange('program', value)}
                />
                <CheckboxComponent
                    label="Primary Program Only"
                    name="primaryProgramOnly"
                    value={formData.areaOfStudy?.primaryProgramOnly}
                    onChange={val => handleChange('primaryProgramOnly', val)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Concentration
                </Typography>
                <MultiSelectField
                    name="concentration"
                    label="Concentration"
                    value={formData.areaOfStudy?.concentration}
                    options={concentrationOptions}
                    onChange={value => handleChange('concentration', value)}
                />
                <CheckboxComponent
                    label="Primary Concentration Only"
                    name="primaryConcentrationOnly"
                    value={formData.areaOfStudy?.primaryConcentrationOnly}
                    onChange={val =>
                        handleChange('primaryConcentrationOnly', val)
                    }
                />
            </Box>
        </Box>
    );
}
