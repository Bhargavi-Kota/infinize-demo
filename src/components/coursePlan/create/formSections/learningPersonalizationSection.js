import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Typography} from '@mui/material';
import {
    MultiSelectField,
    RadioGroupField,
    SelectField
} from '@/components/common/form';
import predefinedOptions from '@/data/coursePlan/form/learningPersonalization.json';
import {useFormContext} from '@/components/common/form/formProvider';

export function LearningPersonalizationSection({formData}) {
    const {setFormData, handleChange} = useFormContext();
    const [priorKnowledge, setPriorKnowledge] = useState([]);

    useEffect(() => {
        setPriorKnowledge(predefinedOptions.priorKnowledge);
    }, []);

    return (
        <Box sx={{mb: 4}}>
            <Typography
                color="primary.main"
                mb={2}
                fontSize={'18px'}
                fontWeight={'500'}
            >
                Learning Personalization
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
                        Prior Knowledge/Skills
                    </Typography>
                    <SelectField
                        id="priorKnowledge"
                        name="priorKnowledge"
                        label="Prior Knowledge/Skills"
                        value={formData.priorKnowledge}
                        options={priorKnowledge}
                        onChange={value =>
                            handleChange('priorKnowledge', value)
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
                        Preferred Learning Pace
                    </Typography>
                    <RadioGroupField
                        id="learningPace"
                        name="learningPace"
                        label="Preferred Learning Pace"
                        value={formData.learningPace}
                        options={['Fast-Paced', 'Steady Progress']}
                        onChange={value => handleChange('learningPace', value)}
                    />
                </Box>
            </Box>
        </Box>
    );
}
