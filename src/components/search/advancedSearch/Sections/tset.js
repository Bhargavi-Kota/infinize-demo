import React, {useState} from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Switch,
    FormControlLabel
} from '@mui/material';
import {SelectField} from '@/components/common/form';
import {InfinizeIcon} from '@/components/common';
import courseDataOptions from './data/courseDataOptions.json';

export default function CourseDataSection({formData, onUpdate}) {
    const courses = formData.courseData?.length ? formData.courseData : [{}];
    const [useAndLogic, setUseAndLogic] = useState(false);

    const subjectOptions = courseDataOptions.subject || [];
    const courseNumberOptions = courseDataOptions.courseNumber || [];
    const courseTitleOptions = courseDataOptions.courseTitle || [];
    const crnOptions = courseDataOptions.crn || [];
    const gradeFilterOptions = ['=', '>', '<', '>=', '<='];
    const gradeOptions = courseDataOptions.grade || [];
    const semesterOptions = courseDataOptions.semester || [];

    const handleFieldChange = (index, field, value) => {
        const updatedCourses = [...courses];
        updatedCourses[index] = {...updatedCourses[index], [field]: value};
        onUpdate({courseData: updatedCourses});
    };

    const handleAddCourse = () => {
        onUpdate({courseData: [...courses, {}]});
    };

    const handleRemoveCourse = index => {
        const updatedCourses = courses.filter((_, idx) => idx !== index);
        onUpdate({courseData: updatedCourses});
    };

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <Box display="flex" alignItems="center" gap={1}>
                <Typography>At least one Course</Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={useAndLogic}
                            onChange={() => setUseAndLogic(prev => !prev)}
                        />
                    }
                    label=""
                />
            </Box>

            {courses.map((course, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <Box display="flex" alignItems="center" width="100%">
                            <Box flex={1} borderBottom="1px dotted #D8E6EC" />
                            <Box
                                px={2}
                                py={1}
                                border="1px solid"
                                borderColor="grey.300"
                                borderRadius={2}
                                fontWeight="bold"
                                color="grey.500"
                                bgcolor="grey.100"
                            >
                                {useAndLogic ? 'AND' : 'OR'}
                            </Box>
                            <Box flex={1} borderBottom="1px dotted #D8E6EC" />
                        </Box>
                    )}

                    <Box
                        display="grid"
                        gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                        gap={3}
                        border={1}
                        borderColor="grey.300"
                        p={2}
                        borderRadius={2}
                    >
                        <SelectField
                            name={`subject-${index}`}
                            label="Subject"
                            value={course.subject}
                            options={subjectOptions}
                            onChange={val =>
                                handleFieldChange(index, 'subject', val)
                            }
                            helperText="Required to search on course data."
                        />

                        <SelectField
                            name={`courseNumber-${index}`}
                            label="Course Number"
                            value={course.courseNumber}
                            options={courseNumberOptions}
                            onChange={val =>
                                handleFieldChange(index, 'courseNumber', val)
                            }
                            helperText="Required to search on course data."
                        />

                        <SelectField
                            name={`courseTitle-${index}`}
                            label="Course Title"
                            value={course.courseTitle}
                            options={courseTitleOptions}
                            onChange={val =>
                                handleFieldChange(index, 'courseTitle', val)
                            }
                        />

                        <SelectField
                            name={`crn-${index}`}
                            label="CRN"
                            value={course.crn}
                            options={crnOptions}
                            onChange={val =>
                                handleFieldChange(index, 'crn', val)
                            }
                        />

                        <SelectField
                            name={`gradeFilter-${index}`}
                            label="Grade Filter"
                            value={course.gradeFilter}
                            options={gradeFilterOptions}
                            onChange={val =>
                                handleFieldChange(index, 'gradeFilter', val)
                            }
                        />

                        <SelectField
                            name={`grade-${index}`}
                            label="Grade"
                            value={course.grade}
                            options={gradeOptions}
                            onChange={val =>
                                handleFieldChange(index, 'grade', val)
                            }
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={course.semesterRange || false}
                                    onChange={e =>
                                        handleFieldChange(
                                            index,
                                            'semesterRange',
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Semester Range"
                        />

                        {course.semesterRange ? (
                            <Box display="flex" gap={2} width="100%">
                                <SelectField
                                    name={`startSemester-${index}`}
                                    label="Start Semester"
                                    value={course.startSemester}
                                    options={semesterOptions}
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'startSemester',
                                            val
                                        )
                                    }
                                />
                                <SelectField
                                    name={`endSemester-${index}`}
                                    label="End Semester"
                                    value={course.endSemester}
                                    options={semesterOptions}
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'endSemester',
                                            val
                                        )
                                    }
                                />
                            </Box>
                        ) : (
                            <SelectField
                                name={`semester-${index}`}
                                label="Semester"
                                value={course.semester}
                                options={semesterOptions}
                                onChange={val =>
                                    handleFieldChange(index, 'semester', val)
                                }
                            />
                        )}

                        {courses.length > 1 && (
                            <IconButton
                                onClick={() => handleRemoveCourse(index)}
                            >
                                <InfinizeIcon icon="fluent:delete-24-filled" />
                            </IconButton>
                        )}
                    </Box>
                </React.Fragment>
            ))}

            <Button
                variant="outlined"
                onClick={handleAddCourse}
                sx={{alignSelf: 'start', textTransform: 'none'}}
            >
                <InfinizeIcon icon="tabler:plus" width={18} height={18} />
                Add
            </Button>
        </Box>
    );
}
