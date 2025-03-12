import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {
    SelectField,
    NumberField,
    MultiSelectField
} from '@/components/common/form';
import predefinedOptions from '@/data/advancedSearch/registrationHistoryOptions.json';
import {registrationHistoryLabels} from './labels';

export default function RegistrationHistory({onUpdate, formData, filterChips}) {
    const [registrationTermsOptions, setRegistrationTermsOptions] = useState(
        predefinedOptions.registrationTerms || []
    );
    const [minCredits, setMinCredits] = useState(
        predefinedOptions.numCreditsRegistered?.minCredits ?? 0
    );
    const [maxCredits, setMaxCredits] = useState(
        predefinedOptions.numCreditsRegistered?.maxCredits ?? 50
    );

    const handleChange = (field, value) => {
        const updatedState = {...formData.registrationHistory, [field]: value};

        onUpdate({registrationHistory: updatedState});
        filterChips(prev => ({
            ...prev,
            registrationHistory: {
                ...prev.registrationHistory,
                [field]: registrationHistoryLabels?.[field] || field
            }
        }));
    };
    return (
        <Box
            display="grid"
            gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
            gap={3}
            mt={1}
        >
            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Registration Terms
                </Typography>
                <MultiSelectField
                    name="registrationTerms"
                    label="Registration Terms"
                    value={formData.registrationHistory?.registrationTerms}
                    options={registrationTermsOptions}
                    onChange={value => handleChange('registrationTerms', value)}
                />
            </Box>

            <Box>
                <Typography
                    fontSize="16px"
                    fontWeight="500"
                    gutterBottom
                    mb={1}
                >
                    Number of Credits Registered
                </Typography>
                <Box display={'flex'} gap={2}>
                    <NumberField
                        name="minCredits"
                        label="Min Credits Registered"
                        value={formData.registrationHistory?.minCredits}
                        onChange={value => handleChange('minCredits', value)}
                        placeholder={'Min'}
                    />
                    <NumberField
                        name="maxCredits"
                        label="Max Credits Registered"
                        value={formData.registrationHistory?.maxCredits}
                        onChange={value => handleChange('maxCredits', value)}
                        placeholder={'Max'}
                    />
                </Box>
            </Box>
        </Box>
    );
}
