'use client';
import CreateCareerRecommendation from '@/components/careerRecommendation';
import {Typography, Box} from '@mui/material';
import {useState} from 'react';

export default function CreateCareerRecommendations() {
    const [IsShowRecomendations, setIsshowRecomendations] = useState(false);

    return (
        <div>
            {IsShowRecomendations ? (
                <Box>
                    <Typography>ShowRecomendations Here</Typography>
                </Box>
            ) : (
                ''
            )}
        </div>
    );
}
