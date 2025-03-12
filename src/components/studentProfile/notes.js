'use client';
import {Box, Typography} from '@mui/material';
import Widget from '../common/widget';
import notesData from '@/data/student/notes.json';
import WidgetCard from '../common/widgetCard';
import styles from './profile.module.css';

export default function Notes({isLoading = true}) {
    const showViewMore = notesData.studentNotes.length > 3;
    const handleViewAll = () => {
        console.log('View all');
    };
    const handleAddNotes = () => {
        console.log('Add Notes');
    };
    return (
        <>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
                <Box>
                    <Widget
                        title={'Notes '}
                        button={
                            showViewMore
                                ? {
                                      type: 'notes',
                                      onViewAll: handleViewAll,
                                      onAddNotes: handleAddNotes
                                  }
                                : {type: 'notes', onAddNotes: handleAddNotes}
                        }
                    >
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
                                        icon={'solar:notes-bold'}
                                    />
                                ))}
                        </Box>
                    </Widget>
                </Box>
            )}
        </>
    );
}
