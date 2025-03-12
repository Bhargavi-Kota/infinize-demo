import React, {useEffect, useState} from 'react';
import {Box, Typography} from '@mui/material';
import {RadioGroupField, SelectField} from '@/components/common/form';
import predefinedOptions from '@/data/coursePlan/form/personalInterests.json';
import {useFormContext} from '@/components/common/form/formProvider';

export function PersonalInterestsSection({formData}) {
    const {setFormData, handleChange} = useFormContext();
    const [clubs, setClubs] = useState([]);
    const [passions, setPassions] = useState([]);

    useEffect(() => {
        setPassions(predefinedOptions.hobbiesPassions);
        setClubs(predefinedOptions.clubs);
    }, []);

    return (
        <Box sx={{mb: 4}}>
            <Typography
                color="primary.main"
                mb={2}
                fontSize={'18px'}
                fontWeight={'500'}
            >
                Personal Interests
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                gap={3}
                mb={2}
            >
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Clubs/Organizations
                    </Typography>
                    <SelectField
                        id="clubs"
                        name="clubs"
                        label="Clubs/Organizations"
                        value={formData.clubs}
                        options={clubs}
                        onChange={value => handleChange('clubs', value)}
                    />
                </Box>

                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Hobbies/Passions
                    </Typography>
                    <SelectField
                        id="passions"
                        name="passions"
                        label="Hobbies/Passions"
                        value={formData.passions}
                        options={passions}
                        onChange={value => handleChange('passions', value)}
                    />
                </Box>

                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Study Abroad or Exchange Opportunities
                    </Typography>
                    <RadioGroupField
                        id="studyAbroad"
                        name="studyAbroad"
                        label="Study Abroad or Exchange Opportunities"
                        value={formData.studyAbroad}
                        options={['Yes', 'No', 'Maybe']}
                        setFormData={setFormData}
                        onChange={value => handleChange('studyAbroad', value)}
                    />
                </Box>
            </Box>
        </Box>
    );
}
