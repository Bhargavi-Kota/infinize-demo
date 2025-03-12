'use client';
import {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import CareerForm from './careerForm';
import CareerRecommendations from './recommendations';
import resumeData from '@/data/careerRecomendation/resumeData.json';
import LoaderDialog from '../common/loaderDialog';

export default function CareerRecomendation() {
    const [IsShowRecomendations, setIsshowRecomendations] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            const storedResume = sessionStorage.getItem('uploadedResume');
            setFormData(prevData => ({
                ...prevData,
                ...(storedResume ? {...resumeData} : {})
            }));
        }, 2000);
    }, []);

    const updateSectionData = data => {
        setFormData({...formData, ...data});
    };

    const handleReset = () => {
        sessionStorage.removeItem('uploadedResume');
        setIsshowRecomendations(false);
    };

    return (
        <Box>
            {loading && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <LoaderDialog open={loading} />
                </Box>
            )}
            {IsShowRecomendations ? (
                <CareerRecommendations
                    isEditable={true}
                    onReset={handleReset}
                />
            ) : (
                <Box>
                    <CareerForm
                        updateSectionData={updateSectionData}
                        formData={formData}
                        ShowRecomendations={() => setIsshowRecomendations(true)}
                    />
                </Box>
            )}
        </Box>
    );
}
