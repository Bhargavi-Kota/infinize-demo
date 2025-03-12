'use client';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Stack,
    Box,
    Menu,
    MenuItem,
    ListItemIcon,
    Select,
    IconButton,
    useTheme
} from '@mui/material';
import {InfinizeIcon} from '../../common';
import classes from '../coursePlan.module.css';
import {useState, useEffect} from 'react';
import CoursePlanDialogs from './dailogs';
import courses from '@/data/coursePlan/courses.json';

export default function CoursePlanAccordion({
    planIndex,
    term,
    termIndex,
    expanded,
    toggleAccordion,
    isEditable = false,
    allTerms
}) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [moveMenuAnchor, setMoveMenuAnchor] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedMoveCourse, setSelectedMoveCourse] = useState(null);
    const [selectedMoveTerm, setSelectedMoveTerm] = useState(null);

    // Dailouge States
    const [courseUnavailable, setCourseUnavailable] = useState(false);
    const [courseConflict, setCourseConflict] = useState(false);
    const [lowCredits, setLowCredits] = useState(false);

    const handleCourseUnavailable = () => {
        handleMenuClose();
        handleMoveMenuClose();
        setCourseUnavailable(false);
    };

    const handleCourseConflict = () => {
        handleMenuClose();
        handleMoveMenuClose();
        setCourseConflict(false);
    };

    const handleLowCredits = () => {
        handleMenuClose();
        handleMoveMenuClose();
        setLowCredits(false);
    };

    const open = Boolean(anchorEl);
    const moveOpen = Boolean(moveMenuAnchor);

    const handleAddClick = () => {
        setShowDropdown(prev => !prev);
        setSelectedCourse(event.target.value);
    };

    const handleChange = event => {
        setSelectedCourse(event.target.value);
        console.log(`Selected: ${event.target.value}`);
    };

    const handleMenuOpen = (event, course, term) => {
        console.log(course, term);
        setSelectedMoveCourse(course);
        setSelectedMoveTerm(term);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMoveMenuOpen = event => {
        setMoveMenuAnchor(event.currentTarget);
    };

    const handleMoveMenuClose = () => {
        setMoveMenuAnchor(null);
        setAnchorEl(null);
    };

    const handleDelete = () => {
        console.log('Delete course');
        handleMenuClose();
    };

    const handleloader = () => {};

    const handleMove = targetTerm => {
        // console.log(selectedMoveCourse, selectedMoveTerm);
        // const currentTerm = selectedMoveTerm;
        // const courseToMove = term.courses.find(
        //     course => course.name === term.courses.name
        // );

        // const targetTermData = allTerms.find(t => t.term === targetTerm);
        // if (!targetTermData) {
        //     setCourseUnavailable(true);
        //     return;
        // }

        // const courseExists = targetTermData.courses.some(
        //     c => c.name === selectedCourse.name
        // );
        // if (courseExists) {
        //     setCourseConflict(true);
        //     return;
        // }

        // const updatedCredits =
        //     selectedMoveTerm.termCredits - courseToMove.credits;
        // if (updatedCredits < selectedMoveTerm.minimumTermCredits) {
        //     setLowCredits(true);
        //     return;
        // }

        // console.log(
        //     `Course '${selectedMoveCourse.name}' moved from ${currentTerm} to ${targetTerm}`
        // );

        handleMoveMenuClose();
        handleMenuClose();
    };

    return (
        <Accordion
            expanded={expanded[`${planIndex}-${termIndex}`] || false}
            onChange={() => toggleAccordion(planIndex, termIndex)}
            disableGutters
            sx={{mt: 1, width: '100%', boxShadow: 'none'}}
        >
            <AccordionSummary
                expandIcon={
                    <InfinizeIcon
                        icon="mdi:expand-more"
                        style={{color: theme.palette.primary.main}}
                        aria-hidden="true"
                    />
                }
                aria-controls={`term-content-${planIndex}-${termIndex}`}
                id={`term-header-${planIndex}-${termIndex}`}
                className={classes.infinize__coursePlanCardAccordion}
            >
                <Stack
                    direction={{xs: 'column', md: 'row'}}
                    justifyContent="space-between"
                    alignItems="center"
                    width="97%"
                >
                    <Typography variant="h6" color="primary">
                        {term.term}
                    </Typography>

                    <Typography color="primary" fontSize={12} fontWeight={500}>
                        {term.termCredits} Credits
                    </Typography>
                </Stack>
            </AccordionSummary>

            <AccordionDetails
                id={`term-content-${planIndex}-${termIndex}`}
                className={classes.infinize__coursePlanCardAccordionDetails}
                sx={{boxShadow: 'none'}}
            >
                {term.courses.length ? (
                    term.courses.map((course, idx) => (
                        <Stack
                            key={idx}
                            className={
                                classes.infinize__coursePlanCardAccordionValue
                            }
                            id="swap-item"
                        >
                            <Typography>{course.name}</Typography>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                width="25%"
                                justifyContent="flex-end"
                            >
                                <Typography fontSize={12} fontWeight={500}>
                                    {course.credits} Credits
                                </Typography>
                                {isEditable && (
                                    <IconButton
                                        onClick={event =>
                                            handleMenuOpen(
                                                event,
                                                course.name,
                                                term
                                            )
                                        }
                                        sx={{
                                            padding: 0,
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                    >
                                        <InfinizeIcon
                                            icon="mi:options-vertical"
                                            style={{
                                                color: '#A3A3A3',
                                                cursor: 'pointer'
                                            }}
                                            height={'20px'}
                                        />
                                    </IconButton>
                                )}
                            </Stack>
                        </Stack>
                    ))
                ) : (
                    <Typography variant="body2" color="gray">
                        No courses available
                    </Typography>
                )}

                {isEditable &&
                    (showDropdown ? (
                        <Box sx={{position: 'relative', width: '100%'}}>
                            {/* Dropdown */}
                            <Stack
                                direction="row"
                                alignItems="start"
                                spacing={1}
                            >
                                <Select
                                    fullWidth
                                    displayEmpty
                                    // renderValue={selected =>
                                    //     !selected && (
                                    //         <span style={{color: '#aaa'}}>
                                    //             Select
                                    //         </span>
                                    //     )
                                    // }
                                    value={selectedCourse}
                                    onChange={handleChange}
                                    className={
                                        classes.infinize__coursePlanSelectCourse
                                    }
                                    IconComponent={() => (
                                        <InfinizeIcon icon="iconoir-nav-arrow-down" />
                                    )}
                                    sx={{
                                        padding: '5px',
                                        '& .MuiSelect-select': {
                                            padding: '8px 16px'
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none'
                                        },
                                        '& .MuiMenu-list': {
                                            backgroundColor: '#f8f8f8'
                                        }
                                    }}
                                >
                                    {/* {courses.Courses.length === 0 && ( */}
                                    <MenuItem value="" disabled>
                                        Select
                                    </MenuItem>
                                    {/* )} */}

                                    {courses.Courses.map((course, idx) => (
                                        <MenuItem
                                            key={idx}
                                            value={`${course.subject} -
                                            ${course.courseNumber}`}
                                            sx={{
                                                backgroundColor: '#f8f8f8',
                                                '&:hover': {
                                                    backgroundColor: '#f0f0f0'
                                                }
                                            }}
                                        >
                                            <Stack>
                                                <Typography>
                                                    {`${course.subject} 
                                            ${course.courseNumber} ${course.courseTitle}`}
                                                </Typography>
                                                <Typography fontSize={12}>
                                                    Credits: {course.credits}
                                                </Typography>
                                            </Stack>
                                            {/* {`${course.subject} 
                                            ${course.courseNumber} ${course.courseTitle} ${course.credits} credits`}{' '} */}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <IconButton
                                    onClick={handleAddClick}
                                    aria-label="remove-course"
                                    className={
                                        classes.infinize__coursePlanCircleDelete
                                    }
                                >
                                    <InfinizeIcon
                                        icon="mdi:minus-circle-outline"
                                        style={{color: '#5A6876'}}
                                    />
                                </IconButton>
                            </Stack>
                            <Button
                                variant="text"
                                fullWidth
                                onClick={handleAddClick}
                                className={
                                    classes.infinize__coursePlanAddButton
                                }
                                disabled={!selectedCourse}
                                sx={{
                                    '&.Mui-disabled': {
                                        color: '#aaa !important',
                                        cursor: 'not-allowed !important'
                                    }
                                }}
                            >
                                Done
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            variant="text"
                            fullWidth
                            onClick={handleAddClick}
                            className={classes.infinize__coursePlanAddButton}
                        >
                            + Add
                        </Button>
                    ))}
            </AccordionDetails>
            {isEditable && (
                <>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow:
                                    '0px 3px 12px 0px rgba(0, 0, 0, 0.25)',
                                padding: '5px 10px',
                                backgroundColor: '#f8f8f8'
                            }
                        }}
                        anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        <MenuItem
                            onClick={handleMoveMenuOpen}
                            className={classes.infinize__menuItem}
                            // onMouseEnter={handleMoveMenuOpen}
                            // onMouseLeave={handleMoveMenuClose}
                        >
                            <ListItemIcon>
                                <InfinizeIcon icon="material-symbols:move-up-rounded" />
                            </ListItemIcon>
                            Move to
                        </MenuItem>
                        <MenuItem
                            onClick={handleDelete}
                            className={classes.infinize__menuItem}
                        >
                            <ListItemIcon>
                                <InfinizeIcon icon="fluent:delete-24-filled" />
                            </ListItemIcon>
                            Delete
                        </MenuItem>
                    </Menu>
                    <Menu
                        anchorEl={moveMenuAnchor}
                        open={moveOpen}
                        onClose={handleMoveMenuClose}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        sx={{
                            '& .MuiPaper-root': {
                                borderRadius: '8px',
                                boxShadow:
                                    '0px 3px 12px 0px rgba(0, 0, 0, 0.25)',
                                padding: '5px 10px',
                                marginLeft: '15px',
                                backgroundColor: '#f8f8f8'
                            }
                        }}
                    >
                        {allTerms
                            .filter(term => term != selectedMoveTerm?.term)
                            .map((termOption, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => handleMove(termOption)}
                                    className={classes.infinize__menuItem}
                                >
                                    {termOption}
                                </MenuItem>
                            ))}
                    </Menu>
                </>
            )}

            <CoursePlanDialogs
                courseUnavailable={courseUnavailable}
                setCourseUnavailable={setCourseUnavailable}
                handleCourseUnavailable={handleCourseUnavailable}
                courseConflict={courseConflict}
                setCourseConflict={setCourseConflict}
                handleCourseConflict={handleCourseConflict}
                lowCredits={lowCredits}
                setLowCredits={setLowCredits}
                handleLowCredits={handleLowCredits}
                closePopup={''}
            />
        </Accordion>
    );
}
