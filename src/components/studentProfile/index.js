'use client';
import {useState, useEffect} from 'react';
import {Box, Typography, Skeleton} from '@mui/material';
import {Widget} from '@/components/common';
import nudgeData from '@/data/student/nudge.json';
import notesData from '@/data/student/notes.json';
import WidgetCard from '@/components/common/widgetCard';
import styles from './profile.module.css';
import {
    EnrollmentDetails,
    Housing,
    CreditsCompleted,
    Holds,
    MajorChangeHistory
} from './tables';
import CoursePlans from './coursePlans';
import CareerMatches from './careerMatches';
import {usePathname} from 'next/navigation';

export default function Profile() {
    const [studentInfo, setStudentInfo] = useState();
    const [isLoading, setIsLoading] = useState(true); // Set to true until data loads

    useEffect(() => {
        // TODO: Fetch student info from API
        // setStudentInfo(student);
        setIsLoading(false);
    }, []);

    const pathname = usePathname();

    const showViewMoreNudges = nudgeData.studentNudges.length > 3;
    const handleViewAllNudges = () => {
        console.log('View all');
    };

    const showViewMoreNote = notesData.studentNotes.length > 3;
    const handleViewAllNotes = () => {
        console.log('View all');
    };

    const handleAddNotes = () => {
        console.log('Add Notes');
    };

    const [expanded, setExpanded] = useState({
        nudges: true,
        alerts: true,
        notes: true,
        holds: true,
        creditsCompleted: true,
        housing: true,
        majorChangeHistory: true,
        careerRecommendations: true,
        coursePlans: true
    });

    const handleAccordionChange = panel => () => {
        setExpanded(prev => ({
            ...prev,
            [panel]: !prev[panel]
        }));
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{overflow: 'hidden', width: '100%'}}
        >
            <EnrollmentDetails title=" Spring 2025" isLoading={isLoading} />

            <Box>
                <Widget
                    expanded={expanded.alerts}
                    onChange={handleAccordionChange('alerts')}
                    title="Alerts & Nudges"
                    button={
                        showViewMoreNudges
                            ? {
                                  type: 'alerts',
                                  onViewAll: handleViewAllNudges
                              }
                            : null
                    }
                    isLoading={isLoading}
                >
                    {isLoading ? (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={200}
                        />
                    ) : (
                        <Box
                            className={styles.infinize__nudgesCards}
                            display="grid"
                            gridTemplateColumns={{
                                xs: '1fr',
                                sm: '1fr 1fr',
                                md: '1fr 1fr 1fr'
                            }}
                            gap={3}
                        >
                            {nudgeData.studentNudges
                                .slice(0, 3)
                                .map((nudge, index) => (
                                    <WidgetCard
                                        key={nudge.id || index}
                                        isNotes={false}
                                        title={nudge.title}
                                        date={nudge.date}
                                        description={nudge.description}
                                        data={nudge.data}
                                        icon={
                                            nudge.type === 'nudge'
                                                ? 'fluent:alert-on-24-filled'
                                                : 'stash:trophy-solid'
                                        }
                                        type={
                                            nudge.type === 'nudge'
                                                ? 'nudge'
                                                : ' '
                                        }
                                    />
                                ))}
                        </Box>
                    )}
                </Widget>
            </Box>

            <Box>
                <Widget
                    expanded={expanded.notes}
                    onChange={handleAccordionChange('notes')}
                    title="Notes"
                    button={
                        showViewMoreNote
                            ? {
                                  type: 'notes',
                                  onViewAll: handleViewAllNotes,
                                  onAddNotes: handleAddNotes
                              }
                            : {type: 'notes', onAddNotes: handleAddNotes}
                    }
                    isLoading={isLoading}
                >
                    {isLoading ? (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={200}
                        />
                    ) : (
                        <Box
                            className={styles.infinize__nudgesCards}
                            display="grid"
                            gridTemplateColumns={{
                                xs: '1fr',
                                sm: '1fr 1fr',
                                md: '1fr 1fr 1fr'
                            }}
                            gap={3}
                        >
                            {notesData.studentNotes
                                .slice(0, 3)
                                .map((notes, index) => (
                                    <WidgetCard
                                        key={notes.id || index}
                                        isNotes={true}
                                        title={notes.title}
                                        date={notes.date}
                                        description={notes.description}
                                        attachment={notes.attachment}
                                        name={notes.createdBy}
                                        icon="solar:notes-bold"
                                    />
                                ))}
                        </Box>
                    )}
                </Widget>
            </Box>

            <Box display="flex" width="100%" gap={3}>
                <Box width="50%">
                    <Widget
                        title="Holds"
                        expanded={expanded.holds}
                        onChange={handleAccordionChange('holds')}
                        isLoading={isLoading}
                    >
                        <Holds isLoading={isLoading} />
                    </Widget>
                </Box>

                <Box width="50%">
                    <Widget
                        title="Credits Completed"
                        expanded={expanded.creditsCompleted}
                        onChange={handleAccordionChange('creditsCompleted')}
                        isLoading={isLoading}
                    >
                        <CreditsCompleted isLoading={isLoading} />
                    </Widget>
                </Box>
            </Box>

            <Box display="flex" width="100%" gap={3}>
                <Box width="50%">
                    <Widget
                        title="Housing"
                        expanded={expanded.housing}
                        onChange={handleAccordionChange('housing')}
                        isLoading={isLoading}
                    >
                        <Housing isLoading={isLoading} />
                    </Widget>
                </Box>

                <Box width="50%">
                    <Widget
                        title="Major Change History"
                        expanded={expanded.majorChangeHistory}
                        onChange={handleAccordionChange('majorChangeHistory')}
                        isLoading={isLoading}
                    >
                        <MajorChangeHistory isLoading={isLoading} />
                    </Widget>
                </Box>
            </Box>

            <Box>
                <CoursePlans isLoading={isLoading} />
            </Box>

            <Box>
                <CareerMatches isLoading={isLoading} />
            </Box>
        </Box>
    );
}
