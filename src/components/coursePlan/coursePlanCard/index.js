'use client';
import {useState, useEffect} from 'react';
import {
    Typography,
    Box,
    Stack,
    useTheme,
    IconButton,
    Dialog,
    DialogTitle,
    Button
} from '@mui/material';
import {InfinizeIcon} from '../../common';
import CoursePlanData from '@/data/coursePlan/coursePlan.json';
import Image from 'next/image';
import classes from '../coursePlan.module.css';
import CoursePlanAccordion from './accordion';
import CoursePlanMenu from './menu';
import Link from 'next/link';
import {useRouter, useParams} from 'next/navigation';
import CoursePlanDialogs from './dailogs';
import Recommendations from '../recommendations';
import LoaderDialog from '@/components/common/loaderDialog';
export default function CoursePlanCard({isEditable = false, onPlanCount}) {
    const {studentId} = useParams();
    const theme = useTheme();
    const router = useRouter();
    const [coursePlan, setCoursePlan] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [savePopup, setSavePopup] = useState(false);
    const [resetPopup, setResetPopup] = useState(false);
    const [showLimitPopup, setShowLimitPopup] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCoursePlan(CoursePlanData.coursePlans);
        const initialExpanded = {};
        CoursePlanData.coursePlans.forEach((plan, planIndex) => {
            if (plan.terms.length > 0) {
                initialExpanded[`${plan.id}-0`] = true;
            }
        });
        setExpanded(initialExpanded);
        if (onPlanCount) {
            onPlanCount(CoursePlanData.coursePlans.length);
        }
    }, [coursePlan]);

    const toggleAccordion = (planId, termIndex) => {
        const key = `${planId}-${termIndex}`;
        setExpanded(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleMenuOpen = (event, planIndex) => {
        setAnchorEl(event.currentTarget);
        setSelectedPlanIndex(planIndex);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPlanIndex(null);
    };

    const handleRegenerate = () => {
        console.log(`Regenerate plan with ID: ${selectedPlanIndex}`);
        handleMenuClose();
    };
    const handleDeleteConfirm = planId => {
        setSelectedPlanIndex(planId);
        setConfirmDeleteOpen(true);
        handleMenuClose();
        console.log(selectedPlanIndex);
    };
    const handleDelete = () => {
        setCoursePlan(coursePlan.filter(plan => plan.id !== selectedPlanIndex));
        handleMenuClose();
        setConfirmDeleteOpen(false);
    };

    const expandAll = () => {
        if (selectedPlanIndex === null) return;
        const newExpandedState = {...expanded};
        const selectedPlan = coursePlan.find(
            plan => plan.id === selectedPlanIndex
        );
        if (selectedPlan) {
            selectedPlan.terms.forEach((_, termIndex) => {
                newExpandedState[`${selectedPlan.id}-${termIndex}`] = true;
            });
        }
        setExpanded(newExpandedState);
        handleMenuClose();
    };

    const collapseAll = () => {
        if (selectedPlanIndex === null) return;
        setExpanded(prev => {
            const newExpandedState = {...prev};
            const selectedPlan = coursePlan.find(
                plan => plan.id === selectedPlanIndex
            );
            if (selectedPlan) {
                selectedPlan.terms.forEach((_, termIndex) => {
                    delete newExpandedState[`${selectedPlan.id}-${termIndex}`];
                });
            }
            return newExpandedState;
        });
        handleMenuClose();
    };

    const handleSave = () => {
        setSavePopup(true);
    };
    const handleSavePopup = () => {
        sessionStorage.setItem('hasCoursePlan', 'true');
        setSavePopup(false);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        router.push(`/student/${studentId}`);
    };

    const handleCancel = () => {
        router.back();
    };

    const handleReset = () => {
        setResetPopup(true);
    };
    const handleResetPopup = () => {
        setResetPopup(false);
    };
    const handleContinue = () => {
        setShowLimitPopup(false);
        router.back();
    };

    return (
        <Box className={classes.infinize__coursePlanCards}>
            {(isEditable ? coursePlan.slice(0, 1) : coursePlan).map(plan => (
                <Box
                    key={plan.id}
                    className={classes.infinize__coursePlanCardWithButtons}
                >
                    <Box className={classes.infinize__coursePlanCard}>
                        <Stack
                            direction="row"
                            className={classes.infinize__coursePlanCardMenuIcon}
                        >
                            {isEditable ? (
                                <IconButton onClick={handleReset}>
                                    <InfinizeIcon
                                        icon="ic:round-reset-tv"
                                        style={{
                                            color: '#A3A3A3',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </IconButton>
                            ) : (
                                <Link
                                    href="#"
                                    style={{color: theme.palette.primary.main}}
                                    onClick={e => {
                                        e.preventDefault();
                                        setPopupOpen(true);
                                    }}
                                >
                                    Additional Recommendations
                                </Link>
                            )}
                            <IconButton
                                onClick={event =>
                                    handleMenuOpen(event, plan.id)
                                }
                            >
                                <InfinizeIcon
                                    icon="mi:options-vertical"
                                    style={{
                                        color: '#A3A3A3',
                                        cursor: 'pointer'
                                    }}
                                />
                            </IconButton>
                        </Stack>
                        <Box className="infinize__IconOuter">
                            <InfinizeIcon
                                icon="fluent:hat-graduation-sparkle-24-filled"
                                style={{color: theme.palette.primary.main}}
                            />
                        </Box>

                        <Typography variant="h2" color="primary">
                            Plan
                        </Typography>
                        <Typography
                            variant="body1"
                            className={classes.infinize__coursePlanTotalCredits}
                        >
                            Total Credits: {plan.totalCredits}
                        </Typography>

                        {plan.terms.map((term, termIndex) => (
                            <CoursePlanAccordion
                                key={termIndex}
                                planIndex={plan.id}
                                term={term}
                                termIndex={termIndex}
                                expanded={expanded}
                                toggleAccordion={toggleAccordion}
                                isEditable={isEditable}
                                allTerms={plan.terms.map(t => t.term)}
                            />
                        ))}
                    </Box>
                    {isEditable ? (
                        <Box
                            className={classes.infinize__coursePlanCardButtons}
                        >
                            <Button
                                style={{
                                    background: theme.palette.primary.main,
                                    color: '#fff'
                                }}
                                onClick={handleSave}
                            >
                                Save
                            </Button>

                            <Button
                                style={{
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    boxShadow: `0px 0px 5px 0px ${theme.palette.primary.main}`,
                                    textTransform: 'none'
                                }}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Box>
                    ) : (
                        ' '
                    )}
                </Box>
            ))}

            <Dialog
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                fullWidth
                maxWidth="sm"
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '12px',
                        padding: '50px 20px 20px'
                    }
                }}
            >
                <IconButton
                    onClick={() => setPopupOpen(false)}
                    sx={{position: 'absolute', right: 8, top: 8}}
                >
                    <InfinizeIcon icon="mdi:close" />
                </IconButton>
                <Recommendations
                    customStyles={{width: '100%', height: '500px'}}
                />
            </Dialog>

            <CoursePlanMenu
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
                expandAll={expandAll}
                collapseAll={collapseAll}
                handleRegenerate={handleRegenerate}
                handleDelete={() => handleDeleteConfirm(selectedPlanIndex)}
                isEditable={isEditable}
            />

            {loading && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <LoaderDialog open={loading} />
                </Box>
            )}
            <CoursePlanDialogs
                confirmDeleteOpen={confirmDeleteOpen}
                setConfirmDeleteOpen={setConfirmDeleteOpen}
                handleDelete={handleDelete}
                resetPopup={resetPopup}
                setResetPopup={setResetPopup}
                handleResetPopup={() => setResetPopup(false)}
                savePopup={savePopup}
                setSavePopup={setSavePopup}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSavePopup={handleSavePopup}
                showLimitPopup={showLimitPopup}
                setShowLimitPopup={setShowLimitPopup}
                handleContinue={handleContinue}
            />
        </Box>
    );
}
