'use client';
import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Button
} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import classes from './common.module.css';
import Link from 'next/link';
import {useParams} from 'next/navigation';

export function Widget({title, expanded, onChange, button, children}) {
    const {studentId} = useParams();
    return (
        <Accordion
            expanded={expanded}
            onChange={onChange}
            className={classes.infinize__widget}
        >
            <AccordionSummary
                component="div"
                expandIcon={
                    <InfinizeIcon
                        icon="flat-color-icons:expand"
                        width={24}
                        height={24}
                    />
                }
                sx={{
                    flexDirection: 'row-reverse',
                    '& .MuiAccordionSummary-content': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }
                }}
            >
                {/* Wrap everything inside a Box to prevent button nesting issues */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    sx={{pl: 1}}
                >
                    <Typography
                        fontSize={'18px'}
                        fontWeight={'bold'}
                        color="primary.main"
                    >
                        {title}
                    </Typography>

                    {/* Buttons must not be direct children of AccordionSummary */}
                    {button && (
                        <Box
                            onClick={event => event.stopPropagation()}
                            display="flex"
                            gap={1}
                        >
                            {button.type === 'alerts' && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={event => {
                                        event.stopPropagation();
                                        event.preventDefault();
                                        button.onViewAll();
                                    }}
                                >
                                    View All
                                </Button>
                            )}

                            {button.type === 'notes' && (
                                <>
                                    {button.onViewAll && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={event => {
                                                event.stopPropagation();
                                                button.onViewAll();
                                            }}
                                        >
                                            View All
                                        </Button>
                                    )}
                                    {button.onAddNotes && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={event => {
                                                event.stopPropagation();
                                                button.onAddNotes();
                                            }}
                                            sx={{textTransform: 'none'}}
                                        >
                                            Add Note
                                        </Button>
                                    )}
                                </>
                            )}

                            {button.type === 'career' && (
                                <>
                                    {button.onViewAll && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={event => {
                                                event.stopPropagation();
                                                button.onViewAll();
                                            }}
                                        >
                                            View All
                                        </Button>
                                    )}
                                    {button.onCreate && (
                                        // <Link
                                        //     href={`/student/${studentId}/careerRecommendations`}
                                        //     passHref
                                        // >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={event => {
                                                event.stopPropagation();
                                                button.onCreate();
                                            }}
                                        >
                                            Generate
                                        </Button>
                                        // </Link>
                                    )}
                                </>
                            )}

                            {button.type === 'course' && (
                                <Link
                                    href={`/student/${studentId}/coursePlan`}
                                    passHref
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={event => {
                                            event.stopPropagation();
                                            button.onCreate();
                                        }}
                                        sx={{textTransform: 'none'}}
                                    >
                                        Create
                                    </Button>
                                </Link>
                            )}
                        </Box>
                    )}
                </Box>
            </AccordionSummary>

            <AccordionDetails sx={{p: 0, overflow: 'hidden', width: '100%'}}>
                {expanded && children}
            </AccordionDetails>
        </Accordion>
    );
}
