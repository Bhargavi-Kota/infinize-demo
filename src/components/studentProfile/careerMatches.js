'use client';
import {useEffect, useState} from 'react';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {Box, Skeleton} from '@mui/material';
import careerData from '@/data/careerRecomendation/careerRecommendations.json';
import NoPlan from '@/components/common/noPlan';
import {Widget} from '@/components/common';
import CareerRecomendations from '@/components/careerRecommendation/recommendations';
import {useRoute} from '@/context/route';
import CareerDialog from '../careerRecommendation/careerDialog';
import {RESUME_ACCEPTED_FORMATS} from '@/config/constants';
import resumeData from '@/data/careerRecomendation/resumeData.json';
import LoaderDialog from '../common/loaderDialog';

export default function CareerMatches() {
    const {studentId} = useParams();
    const pathname = usePathname();
    // const {prevRoute} = useRoute();
    const router = useRouter();

    const dataLength = careerData.recommendations.length;
    const viewData = dataLength > 3;

    const handleViewAll = () => console.log('View all');
    const handleAddCareer = () => {
        handleOpenModal();
        console.log('Add Career');
    };

    const [expanded, setExpanded] = useState({careerMatches: true});
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // default loader state
    const [loading, setLoading] = useState(false);

    const [hasCareerRecommendations, setHasCareerRecommendations] = useState(
        () => {
            if (typeof window !== 'undefined') {
                return (
                    sessionStorage.getItem('hasCareerRecommendations') ===
                    'true'
                );
            }
            return false;
        }
    );

    useEffect(() => {
        setMounted(true);
        // Simulate loading delay (e.g., waiting for API response)
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const isProfileRoute = pathname === `/student/${studentId}`;
    const showNoPlan = !hasCareerRecommendations && isProfileRoute;

    const handleAccordionChange = panel => () => {
        setExpanded(prev => ({
            ...prev,
            [panel]: !prev[panel]
        }));
    };

    const [isOpen, setIsOpen] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);

    const handleResumeUpload = file => {
        if (!file) return;

        if (!RESUME_ACCEPTED_FORMATS.includes(file.type)) {
            console.error('Invalid file format. Please upload a PDF.');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base64File = reader.result;
            sessionStorage.setItem('uploadedResume', base64File);
            setResumeFile(file);
        };
    };

    const handleOpenModal = () => {
        sessionStorage.removeItem('uploadedResume');
        setIsOpen(true);
    };

    const handleCloseModal = () => setIsOpen(false);

    const OnContinue = () => {
        handleCloseModal();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push(`/student/${studentId}/careerRecommendations`);
        }, 4000);
    };

    const OnSkip = () => {
        handleCloseModal();
        sessionStorage.removeItem('uploadedResume');
        router.push(`/student/${studentId}/careerRecommendations`);
    };

    return (
        <Box>
            {loading && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <LoaderDialog open={loading} />
                </Box>
            )}
            {mounted ? (
                isLoading ? (
                    // Show Skeleton loader while loading
                    <Skeleton variant="rectangular" width="100%" height={300} />
                ) : (
                    <Widget
                        expanded={expanded.careerMatches}
                        onChange={handleAccordionChange('careerMatches')}
                        title="Career Recommendations"
                        button={
                            showNoPlan
                                ? null
                                : viewData
                                ? {
                                      type: 'career',
                                      onViewAll: handleViewAll,
                                      onCreate: handleAddCareer
                                  }
                                : {type: 'career', onCreate: handleAddCareer}
                        }
                    >
                        <Box>
                            {!showNoPlan ? (
                                <CareerRecomendations />
                            ) : (
                                <NoPlan
                                    title="There are no career recommendations"
                                    description="Get started by exploring career paths that align with your interests and goals"
                                    button="Generate"
                                    OpenModal={handleOpenModal}
                                />
                            )}
                        </Box>
                        <CareerDialog
                            resumeFile={resumeFile}
                            open={isOpen}
                            onClose={handleCloseModal}
                            handleResumeUpload={handleResumeUpload}
                            Continue={OnContinue}
                            OnSkip={OnSkip}
                        />
                    </Widget>
                )
            ) : null}
        </Box>
    );
}
