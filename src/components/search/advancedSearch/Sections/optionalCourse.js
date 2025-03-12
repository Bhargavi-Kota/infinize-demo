import React, {useState} from 'react';
import {Box, Button, IconButton, Typography} from '@mui/material';
import {SelectField} from '@/components/common/form';
import {InfinizeIcon} from '@/components/common';
import courseDataOptions from '@/data/advancedSearch/courseRequirements.json';
import {courseRequirementsLabels} from './labels';

export default function OptionalCourse({onUpdate, formData, filterChips}) {
    const optionalCourses = formData.optionalCourse ?? [{}];
    const [isSubstituteCourse, setIsSubstituteCourse] = useState({});
    const [subjectOptions, setSubjectOptions] = useState(
        courseDataOptions.courses || []
    );
    const [substituteCourseOptions, setSubstituteCourseOptions] = useState(
        courseDataOptions.substituteCourses || []
    );

    const handleFieldChange = (index, field, value) => {
        const updatedCourses = [...(optionalCourses || [])];
        updatedCourses[index] = {...updatedCourses[index], [field]: value};
        onUpdate({optionalCourse: updatedCourses});

        filterChips(prev => ({
            ...prev,
            courseRequirements: {
                ...prev.courseRequirements,
                [field]: courseRequirementsLabels?.[field] || field
            }
        }));
    };

    const handleAddRequirement = () => {
        const updatedCourses = [...(optionalCourses || []), {}];
        onUpdate({optionalCourse: updatedCourses});
    };

    const handleRemoveRequirement = index => {
        const updatedCourses = optionalCourses.filter((_, i) => i !== index);
        onUpdate({optionalCourse: updatedCourses});
    };

    const enableSubstituteCourse = index => {
        setIsSubstituteCourse(prev => ({
            ...prev,
            [index]: true
        }));
    };

    const disableSubstituteCourse = index => {
        setIsSubstituteCourse(prev => ({
            ...prev,
            [index]: false
        }));
        handleFieldChange(index, 'substituteCourse', '');
    };
    return (
        <Box display="flex" flexDirection="column" gap={3} mt={1}>
            <Typography fontSize="16px" fontWeight="500" gutterBottom mb={1}>
                Optional Course
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {optionalCourses?.map((course, index) => (
                    <Box
                        key={index}
                        border={1}
                        borderColor="grey.300"
                        p={2}
                        borderRadius={2}
                    >
                        <Box
                            display="grid"
                            gridTemplateColumns={{
                                xs: '1fr',
                                sm: '1fr 1fr auto'
                            }}
                            gap={3}
                            alignItems="center"
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
                                    value={course.subject || ''}
                                    options={subjectOptions.map(
                                        (option, idx) => ({
                                            label: option.subject,
                                            value: option.subject,
                                            key: `subject-${option.subject}-${idx}`
                                        })
                                    )}
                                    onChange={val =>
                                        handleFieldChange(index, 'subject', val)
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
                                    Substitute Course
                                </Typography>
                                {isSubstituteCourse[index] ? (
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                    >
                                        <SelectField
                                            name={`substituteCourse-${index}`}
                                            label="Substitute Course"
                                            value={
                                                course.substituteCourse || ''
                                            }
                                            options={subjectOptions.map(
                                                (option, idx) => ({
                                                    label: option.subject,
                                                    value: option.subject,
                                                    key: `subject-${option.subject}-${idx}`
                                                })
                                            )}
                                            onChange={val =>
                                                handleFieldChange(
                                                    index,
                                                    'substituteCourse',
                                                    val
                                                )
                                            }
                                        />
                                        <IconButton
                                            sx={{
                                                border: '1px solid #5A6876',
                                                borderRadius: '0px'
                                            }}
                                            onClick={() =>
                                                disableSubstituteCourse(index)
                                            }
                                        >
                                            <InfinizeIcon
                                                icon={'lucide:circle-minus'}
                                            />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        onClick={() =>
                                            enableSubstituteCourse(index)
                                        }
                                        sx={{
                                            alignSelf: 'start',
                                            textTransform: 'none'
                                        }}
                                    >
                                        <InfinizeIcon
                                            icon={'tabler:plus'}
                                            width={18}
                                            hight={18}
                                        />
                                        Add Substitute Course
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        {optionalCourses?.length > 1 && (
                            <Box
                                display="flex"
                                justifyContent="start"
                                alignItems="start"
                                border={'1px solid #5A6876'}
                                width={'fit-content'}
                                mt={1}
                            >
                                <IconButton
                                    onClick={() =>
                                        handleRemoveRequirement(index)
                                    }
                                >
                                    <InfinizeIcon
                                        icon={'fluent:delete-24-filled'}
                                    />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
            <Button
                variant="outlined"
                onClick={handleAddRequirement}
                sx={{alignSelf: 'start', textTransform: 'none'}}
            >
                <InfinizeIcon icon={'tabler:plus'} width={18} hight={18} />
                Add
            </Button>
        </Box>
    );
}
