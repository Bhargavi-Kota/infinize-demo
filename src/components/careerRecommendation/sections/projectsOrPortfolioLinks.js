import React, {useState} from 'react';
import {Box, Button, IconButton, Typography} from '@mui/material';
import {TextInput, LimitedTextArea} from '@/components/common/form';

import {InfinizeIcon} from '@/components/common';

export function ProjectsOrPortfolioLinks({onUpdate, formData}) {
    const projectsOrPortfolioLinks = formData?.projectsOrPortfolioLinks ?? [{}];

    const handleFieldChange = (index, field, value) => {
        const updatedCourses = [...(projectsOrPortfolioLinks || [])];
        updatedCourses[index] = {...updatedCourses[index], [field]: value};

        onUpdate({projectsOrPortfolioLinks: updatedCourses});
    };

    const handleAdd = () => {
        const updatedCourses = [...(projectsOrPortfolioLinks || []), {}];
        onUpdate({projectsOrPortfolioLinks: updatedCourses});
    };

    const handleRemove = index => {
        const updatedCourses = projectsOrPortfolioLinks.filter(
            (_, idx) => idx !== index
        );
        onUpdate({projectsOrPortfolioLinks: updatedCourses});
    };

    return (
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography
                fontSize="16px"
                fontWeight="500"
                gutterBottom
                mb={1}
                color="primary.main"
            >
                Projects / Portfolio Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {projectsOrPortfolioLinks?.map((Positions, index) => (
                    <Box className="border" p={3} key={index}>
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
                                    Project Title
                                </Typography>
                                <TextInput
                                    name={`projectTitle${index}`}
                                    label="Project Title"
                                    value={Positions.projectTitle}
                                    onChange={val =>
                                        handleFieldChange(
                                            index,
                                            'projectTitle',
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
                            {projectsOrPortfolioLinks?.length > 1 && (
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
