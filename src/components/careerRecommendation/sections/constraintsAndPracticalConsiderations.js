import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {SelectField} from '@/components/common/form';
import Options from '@/data/careerRecomendation/constraintsAndPracticalConsiderations.json';

export function ConstraintsAndPracticalConsiderations({formData, onUpdate}) {
    const [financialConstraintsOrNeeds, setFinancialConstraintsOrNeeds] =
        useState(Options.financialConstraintsOrNeeds || []);
    const [timeline, setTimeline] = useState(Options.timeline || []);

    const handleChange = (field, value) => {
        const updatedState = {
            ...formData.constraintsAndPracticalConsiderations,
            [field]: value
        };

        onUpdate({constraintsAndPracticalConsiderations: updatedState});
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
                Constraints & Practical Considerations
            </Typography>
            <Box
                display="grid"
                gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                gap={3}
                className="border"
                p={3}
            >
                <Box>
                    <Typography
                        fontSize="16px"
                        fontWeight="500"
                        gutterBottom
                        mb={1}
                    >
                        Financial Constraints / Needs
                    </Typography>
                    <SelectField
                        name="financialConstraintsOrNeeds"
                        label="Financial Constraints / Needs"
                        value={
                            formData.constraintsAndPracticalConsiderations
                                ?.financialConstraintsOrNeeds
                        }
                        options={financialConstraintsOrNeeds}
                        onChange={value =>
                            handleChange('financialConstraintsOrNeeds', value)
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
                        Timeline / Urgency
                    </Typography>
                    <SelectField
                        name="Timeline"
                        label="Timeline / Urgency"
                        value={
                            formData.constraintsAndPracticalConsiderations
                                ?.Timeline
                        }
                        options={timeline}
                        onChange={value => handleChange('Timeline', value)}
                    />
                </Box>
            </Box>
        </Box>
    );
}
