'use client';
import CreateCareerRecommendation from '@/components/careerRecommendation';
import {Typography, Box} from '@mui/material';
import {useState} from 'react';

export default function CoursePlan() {
    const [IsShowRecomendations, SetIsshowRecomendations] = useState(false);
    const handlRecomendations = () => {
        SetIsshowRecomendations(true);
    };
    return (
        <div>
            {IsShowRecomendations ? (
                <Box>
                    <Typography>ShowRecomendations Here</Typography>
                </Box>
            ) : (
                <CreateCareerRecommendation
                    showRecomendations={handlRecomendations}
                />
            )}
        </div>
    );
}
