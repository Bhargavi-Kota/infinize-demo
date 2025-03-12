import React, {useState} from 'react';
import {Box, Button, IconButton, Typography} from '@mui/material';
import {
    TextInput,
    LimitedTextArea,
    DateFieldComponent,
    CheckboxComponent
} from '@/components/common/form';

import {InfinizeIcon} from '@/components/common';

export function PastPositionsInternships({onUpdate, formData}) {
    const pastPositionsInternships = formData?.pastPositionsInternships ?? [{}];

    const handleFieldChange = (index, field, value) => {
        console.log(`Updating ${field} at index ${index} to`, value);
        const updatedCourses = [...(pastPositionsInternships || [])];

        if (field === 'iCurrentlyWorkHere' && value) {
            updatedCourses[index] = {
                ...updatedCourses[index],
                [field]: value,
                to: ''
            };
        } else {
            updatedCourses[index] = {
                ...updatedCourses[index],
                [field]: value
            };
        }
        onUpdate({pastPositionsInternships: updatedCourses});
    };

    const handleAdd = () => {
        const updatedCourses = [...(pastPositionsInternships || []), {}];
        onUpdate({pastPositionsInternships: updatedCourses});
    };

    const handleRemove = index => {
        const updatedCourses = pastPositionsInternships.filter(
            (_, idx) => idx !== index
        );
        onUpdate({pastPositionsInternships: updatedCourses});
    };

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography
                fontSize="16px"
                fontWeight="500"
                gutterBottom
                mb={1}
                color="primary.main"
            >
                Past Positions / Internships
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                {pastPositionsInternships?.map((Positions, index) => (
                    <Box p={3} className="border" key={index}>
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
                                    Position Title
                                </Typography>
                                <TextInput
                                    name={`positionTitle${index}`}
                                    label="Position Title"
                                    value={Positions.positionTitle}
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'positionTitle',
                                            val
                                        )
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
                                    Company/Organization
                                </Typography>
                                <TextInput
                                    name={`company${index}`}
                                    label="Company/Organization"
                                    value={Positions.company}
                                    onChange={val =>
                                        handleFieldChange(index, 'company', val)
                                    }
                                />
                            </Box>
                            <Box>
                                <Box display={'flex'} gap={2}>
                                    <Box flex={1}>
                                        <Typography
                                            fontSize="16px"
                                            fontWeight="500"
                                            gutterBottom
                                            mb={1}
                                        >
                                            From
                                        </Typography>
                                        <DateFieldComponent
                                            name={`from${index}`}
                                            label="From"
                                            value={Positions?.from}
                                            onChange={val =>
                                                handleFieldChange(
                                                    index,
                                                    'from',
                                                    val
                                                )
                                            }
                                        />
                                    </Box>
                                    {!Positions?.isCurrentlyWorkHere && (
                                        <Box flex={1}>
                                            <Typography
                                                fontSize="16px"
                                                fontWeight="500"
                                                gutterBottom
                                                mb={1}
                                            >
                                                To
                                            </Typography>
                                            <DateFieldComponent
                                                label="To"
                                                name={`to${index}`}
                                                value={Positions?.to}
                                                onChange={val =>
                                                    handleFieldChange(
                                                        index,
                                                        'to',
                                                        val
                                                    )
                                                }
                                            />
                                        </Box>
                                    )}
                                </Box>
                                <CheckboxComponent
                                    label="I Am currently working here"
                                    name={`isCurrentlyWoringkHere${index}`}
                                    value={Positions?.isCurrentlyWorkHere}
                                    onChange={val => {
                                        handleFieldChange(
                                            index,
                                            'isCurrentlyWoringkHere',
                                            val
                                        );
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    fontSize="16px"
                                    fontWeight="500"
                                    gutterBottom
                                    mb={1}
                                >
                                    Key Responsibilities / Achievements
                                </Typography>
                                <LimitedTextArea
                                    name={`keyResponsibilities${index}`}
                                    label="Key Responsibilities / Achievements"
                                    value={Positions.keyResponsibilities}
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'keyResponsibilities',
                                            val
                                        )
                                    }
                                />
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="start"
                            alignItems="start"
                            mt={1}
                        >
                            {pastPositionsInternships?.length > 1 && (
                                <Box
                                    display="flex"
                                    justifyContent="start"
                                    alignItems="start"
                                    border={'1px solid #5A6876'}
                                    width={'fit-content'}
                                    mt={1}
                                >
                                    <IconButton
                                        onClick={() => handleRemove(index)}
                                    >
                                        <InfinizeIcon
                                            icon={'fluent:delete-24-filled'}
                                        />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            <Button
                variant="outlined"
                onClick={handleAdd}
                sx={{alignSelf: 'start', textTransform: 'none'}}
            >
                <InfinizeIcon icon={'tabler:plus'} width={18} height={18} />
                Add
            </Button>
        </Box>
    );
}
