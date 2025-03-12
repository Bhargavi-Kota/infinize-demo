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
import courseDataOptions from '@/data/advancedSearch/courseDataOptions.json';
import {courseDataLabels} from './labels';

export default function CourseData({formData, onUpdate, filterChips}) {
    const courseData = formData?.courseData ?? [{}];

    const [useAndLogic, setUseAndLogic] = useState(false);

    const [courses, setCourses] = useState(courseDataOptions.Courses || []);

    const [crnOptions, setCrnOptions] = useState(courseDataOptions.crn || []);
    const [gradeFilterOptions, setGradeFilterOptions] = useState([
        '=',
        '>',
        '<',
        '>=',
        '<='
    ]);
    const [gradeOptions, setGradeOptions] = useState(
        courseDataOptions.grade || []
    );
    const [semesterOptions, setSemesterOptions] = useState(
        courseDataOptions.semester || []
    );

    const handleFieldChange = (index, field, value) => {
        const updatedCourses = [...(courseData || [])];
        updatedCourses[index] = {...updatedCourses[index], [field]: value};
        if (field === 'semesterRange' && value) {
            updatedCourses[index].semester = '';
        } else if (field === 'semester' && value) {
            updatedCourses[index].semesterRange = false;
            updatedCourses[index].startSemester = '';
            updatedCourses[index].endSemester = '';
        }

        onUpdate({courseData: updatedCourses});
        filterChips(prev => ({
            ...prev,
            courseData: {
                ...prev.courseData,
                [field]: courseDataLabels?.[field] || field
            }
        }));
    };

    const handleAddCourse = () => {
        const updatedCourses = [...(courseData || []), {}];
        onUpdate({courseData: updatedCourses});
    };

    const handleRemoveCourse = index => {
        const updatedCourses = courseData.filter((_, idx) => idx !== index);
        onUpdate({courseData: updatedCourses});
    };
    return (
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
            {courseData.length > 1 && (
                <Box display={'flex'} alignItems={'center'} gap={1}>
                    <Typography>At least one Course</Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={useAndLogic}
                                onChange={() => setUseAndLogic(prev => !prev)}
                            />
                        }
                        label={''}
                    />
                    <Typography>Every Course</Typography>
                </Box>
            )}
            {courseData?.map((course, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            gap={2}
                            width="100%"
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                width="100%"
                            >
                                <Box
                                    flex={1}
                                    borderBottom="1px dotted #D8E6EC"
                                />
                                <Box
                                    px={2}
                                    py={1}
                                    border="1px solid"
                                    borderColor="grey.300"
                                    borderRadius={2}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    fontWeight="bold"
                                    color="grey.500"
                                    bgcolor="grey.100"
                                >
                                    {useAndLogic ? 'AND' : 'OR'}
                                </Box>
                                <Box
                                    flex={1}
                                    borderBottom="1px dotted #D8E6EC"
                                />
                            </Box>
                        </Box>
                    )}
                    <Box
                        key={index}
                        display="grid"
                        gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                        gap={3}
                        alignItems="center"
                        border={1}
                        borderColor="grey.300"
                        p={2}
                        borderRadius={2}
                    >
                        <Box>
                            <Typography
                                fontSize="16px"
                                fontWeight="500"
                                gutterBottom
                                mb={1}
                            >
                                Subject
                            </Typography>
                            <SelectField
                                name={`subject-${index}`}
                                label="Subject"
                                value={course.subject}
                                options={courses.map((option, idx) => ({
                                    label: option.subject,
                                    value: option.subject,
                                    key: `subject-${option.subject}-${idx}`
                                }))}
                                onChange={val =>
                                    handleFieldChange(index, 'subject', val)
                                }
                                helperText={
                                    'Required to search on course data.'
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
                                Course Number
                            </Typography>
                            <SelectField
                                name={`courseNumber-${index}`}
                                label="Course Number"
                                value={course.courseNumber}
                                options={courses.map((option, idx) => ({
                                    label: option.courseNumber,
                                    value: option.courseNumber,
                                    key: `courseNumber-${option.courseNumber}-${idx}`
                                }))}
                                onChange={val =>
                                    handleFieldChange(
                                        index,
                                        'courseNumber',
                                        val
                                    )
                                }
                                helperText={
                                    'Required to search on course data.'
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
                                Course Title
                            </Typography>
                            <SelectField
                                name={`courseTitle-${index}`}
                                label="Course Title"
                                value={course.courseTitle}
                                options={courses.map((option, idx) => ({
                                    label: option.courseTitle,
                                    value: option.courseTitle,
                                    key: `courseTitle-${option.courseTitle}-${idx}`
                                }))}
                                onChange={val =>
                                    handleFieldChange(index, 'courseTitle', val)
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
                                CRN
                            </Typography>
                            <SelectField
                                name={`crn-${index}`}
                                label="CRN"
                                value={course.crn}
                                options={crnOptions}
                                onChange={val =>
                                    handleFieldChange(index, 'crn', val)
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
                                Grade Filter
                            </Typography>
                            <SelectField
                                name={`gradeFilter-${index}`}
                                label="Grade Filter"
                                value={course.gradeFilter}
                                options={gradeFilterOptions}
                                onChange={val =>
                                    handleFieldChange(index, 'gradeFilter', val)
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
                                Grade
                            </Typography>
                            <SelectField
                                name={`grade-${index}`}
                                label="Grade"
                                value={course.grade}
                                options={gradeOptions}
                                onChange={val =>
                                    handleFieldChange(index, 'grade', val)
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
                                Semester Range
                            </Typography>
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
                        </Box>

                        {course.semesterRange ? (
                            <Box display={'flex'} gap={2}>
                                <Box width={'100%'}>
                                    <Typography
                                        fontSize="16px"
                                        fontWeight="500"
                                        gutterBottom
                                        mb={1}
                                    >
                                        Start Semester
                                    </Typography>
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
                                </Box>
                                <Box width={'100%'}>
                                    <Typography
                                        fontSize="16px"
                                        fontWeight="500"
                                        gutterBottom
                                        mb={1}
                                    >
                                        End Semester
                                    </Typography>
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
                            </Box>
                        ) : (
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
                                    name={`semester-${index}`}
                                    label="Semester"
                                    value={course.semester}
                                    options={semesterOptions}
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'semester',
                                            val
                                        )
                                    }
                                />
                            </Box>
                        )}
                        {courseData.length > 1 && (
                            <Box
                                display="flex"
                                justifyContent="start"
                                alignItems="start"
                                border={'1px solid #5A6876'}
                                width={'fit-content'}
                                mt={1}
                            >
                                <IconButton
                                    onClick={() => handleRemoveCourse(index)}
                                >
                                    <InfinizeIcon
                                        icon={'fluent:delete-24-filled'}
                                    />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                </React.Fragment>
            ))}
            <Button
                variant="outlined"
                onClick={handleAddCourse}
                sx={{alignSelf: 'start', textTransform: 'none'}}
            >
                <InfinizeIcon icon={'tabler:plus'} width={18} hight={18} />
                Add
            </Button>
        </Box>
    );
}
