'use client';
import React, {useState, useEffect} from 'react';
import {Box, Button, Typography} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';
import markdownContent from '@/data/mardDownContent/sample.md';
import {LimitedTextArea} from '@/components/common/form';
import classes from './markDownViewer.module.css';
import CoursePlanRecommendations from '../coursePlanRecommendations';
import LoaderDialog from '@/components/common/loaderDialog';

export default function MarkdownViewer() {
    const [contextforAI, setContextforAI] = useState('');
    const [displayText, setDisplayText] = useState('');
    const [words, setWords] = useState([]);
    const [wordIndex, setWordIndex] = useState(0);
    const [showRecommendations, setShowRecommendations] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleShowRecommendations = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 8000);
        setShowRecommendations(true);
    };

    useEffect(() => {
        if (showRecommendations) {
            window.scrollTo(0, 0);
        }
    }, [showRecommendations]);

    useEffect(() => {
        setWords(markdownContent.split(' '));
        setDisplayText('');
        setWordIndex(0);
    }, []);

    useEffect(() => {
        if (wordIndex < words.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + ' ' + words[wordIndex]);
                setWordIndex(wordIndex + 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [wordIndex, words]);

    const handleFieldChange = value => {
        setContextforAI(value ?? '');
    };

    return (
        <>
            {showRecommendations ? (
                <>
                    {loading && (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <LoaderDialog open={loading} />
                        </Box>
                    )}
                    <CoursePlanRecommendations loading={loading} />
                </>
            ) : (
                <Box className={classes.infinize__markDownContainer}>
                    <Typography
                        variant="h6"
                        color="primary.main"
                        fontWeight={600}
                    >
                        Course Plan AI Reasoning
                    </Typography>
                    <Box className={classes.infinize__markDownViewerContainer}>
                        <Box
                            className={
                                classes.infinize__markDownViewer2dContainer
                            }
                        >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {displayText}
                            </ReactMarkdown>
                        </Box>
                    </Box>
                    <Box width={'100%'}>
                        <LimitedTextArea
                            maxWords={250}
                            placeholder={
                                'Addition instructions or context for AI'
                            }
                            name="contextforAI"
                            label="contextforAI"
                            value={contextforAI}
                            onChange={val => handleFieldChange(val)}
                        />
                        <Button
                            variant="contained"
                            sx={{textTransform: 'none', mt: 1}}
                            onClick={handleShowRecommendations}
                        >
                            GeneratePlan
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
}
