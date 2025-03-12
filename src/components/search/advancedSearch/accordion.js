import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box
} from '@mui/material';
import classes from './advancedSearch.module.css';
import {InfinizeIcon} from '@/components/common';
import {CustomChip} from '@/components/common/form';

export default function VisualAccordion({
    title,
    expanded,
    onChange,
    children,
    formData,
    chips,
    ref
}) {
    const selectedChips = chips
        ? Object.entries(chips)
              .filter(([key, value]) => value)
              .map(([key, value]) => value)
        : [];

    const handleDelete = () => {
        console.log('deleted');
        //Todo implement delele logic
    };
    return (
        <Accordion
            expanded={expanded}
            onChange={onChange}
            className={classes.infinize__advancedSearch__accordion}
            sx={{
                borderRadius: '10px',
                ':first-of-type': {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                },
                ':last-of-type': {
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }
            }}
        >
            <AccordionSummary
                expandIcon={<InfinizeIcon icon={'si:expand-more-duotone'} />}
                sx={{
                    minHeight: '56px',
                    borderBottom: expanded && '2px solid #D8E6EC',
                    '& .MuiTypography-root': {
                        fontWeight: '600',
                        fontSize: '18px',
                        color: expanded && 'primary.main'
                    }
                }}
            >
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                    <Typography fontSize={'18px'} fontWeight={'600'}>
                        {title}
                    </Typography>
                    {selectedChips && selectedChips.length > 0 && (
                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                            {selectedChips.map((chip, index) => (
                                <CustomChip
                                    key={index}
                                    label={chip}
                                    onDelete={() => handleDelete(chip)}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
}
