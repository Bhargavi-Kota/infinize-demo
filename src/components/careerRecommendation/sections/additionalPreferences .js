import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {MultiSelectField, LimitedTextArea} from '@/components/common/form';
import Options from '@/data/careerRecomendation/additionalAndPreferences.json';

export function AdditionalAndPreferences({formData, onUpdate}) {
    const [softSkillsOptions, setSoftSkillsOptions] = useState(
        Options.softSkillsOptions || []
    );
    const [hobbiesOptions, setHobbiesOptions] = useState(
        Options.hobbiesOptions || []
    );
    const [teamPreferencesOptions, setTeamPreferencesOptions] = useState(
        Options.teamPreferencesOptions || []
    );

    const handleChange = (field, value) => {
        const updatedState = {
            ...formData.additionalAndPreferences,
            [field]: value
        };

        onUpdate({additionalAndPreferences: updatedState});
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
                Additional Preferences & Interests
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
                        Soft Skills
                    </Typography>
                    <MultiSelectField
                        name="softSkills"
                        label="Soft Skills"
                        value={formData.additionalAndPreferences?.softSkills}
                        options={softSkillsOptions}
                        onChange={value => handleChange('softSkills', value)}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Hobbies / Personal Interests 
                    </Typography>
                    <MultiSelectField
                        name="hobbies"
                        label="Hobbies / Personal Interests"
                        value={formData.additionalAndPreferences?.hobbies}
                        options={hobbiesOptions}
                        onChange={value => handleChange('hobbies', value)}
                    />
                </Box>
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Team / Culture Preferences 
                    </Typography>
                    <MultiSelectField
                        name=" teamPreferences "
                        label="Team / Culture Preferences "
                        value={
                            formData.additionalAndPreferences?.teamPreferences
                        }
                        options={teamPreferencesOptions}
                        onChange={value =>
                            handleChange('teamPreferences', value)
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
                        Extracurricular Volunteer Involvement
                    </Typography>
                    <LimitedTextArea
                        name="extracurricularVolunteerInvolvement"
                        label="Extracurricular Volunteer Involvement"
                        value={
                            formData.additionalAndPreferences
                                ?.extracurricularVolunteerInvolvement
                        }
                        onChange={val =>
                            handleChange(
                                'extracurricularVolunteerInvolvement',
                                val
                            )
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
}
