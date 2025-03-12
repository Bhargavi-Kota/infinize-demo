import React, {useState} from 'react';
import {Box, Button, IconButton, Typography} from '@mui/material';
import {SelectField, MultiSelectField} from '@/components/common/form';
import {InfinizeIcon} from '@/components/common';
import Options from '@/data/careerRecomendation/skills.json';

export function Skills({formData, onUpdate}) {
    const skillsList = formData?.skills ?? [{}];

    const [typeOptions, setTypeOptions] = useState(Options.type || []);
    const [proficiencyOptions, setProficiencyOptions] = useState(
        Options.proficiency || []
    );

    const handleFieldChange = (index, field, value) => {
        console.log(`Updating ${field} at index ${index} to`, value);
        const updatedSkills = [...skillsList];

        updatedSkills[index] = {
            ...updatedSkills[index],
            [field]: value
        };

        onUpdate({skills: updatedSkills});
    };

    const handleAdd = () => {
        const updatedSkills = [...skillsList, {}];
        onUpdate({skills: updatedSkills});
    };

    const handleRemove = index => {
        const updatedSkills = skillsList.filter((_, idx) => idx !== index);
        onUpdate({skills: updatedSkills});
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
                Skills
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                {skillsList.map((skill, index) => (
                    <Box p={3} key={index} className="border">
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
                                    Skill
                                </Typography>
                                <SelectField
                                    name={`skill${index}`}
                                    label="Skill"
                                    value={skill?.skill}
                                    options={typeOptions}
                                    onChange={value =>
                                        handleFieldChange(index, 'skill', value)
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
                                    Proficiency Level
                                </Typography>
                                <SelectField
                                    name={`proficiencyLevel${index}`}
                                    label="Proficiency Level"
                                    value={skill?.proficiencyLevel}
                                    options={proficiencyOptions}
                                    onChange={value =>
                                        handleFieldChange(
                                            index,
                                            'proficiencyLevel',
                                            value
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
                            {skillsList.length > 1 && (
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
