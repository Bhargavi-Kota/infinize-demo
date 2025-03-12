'use client';
import React, {useState, useRef} from 'react';
import {Box, Typography, IconButton, Stack} from '@mui/material';
import {useRouter} from 'next/navigation';
import SaveSearchDialog from '../search/advancedSearch/saveSearchDialog';
import {SearchButtons} from '../search/advancedSearch/searchButtons';
import SavedSearchesPopup from './savedSearchesPopup';
import AdvancedSearchSections from '../search/advancedSearch/advancedSearchSections';
import studentSearchStyles from './search.module.css';
import advancedSearchStyles from '../search/advancedSearch/advancedSearch.module.css';
import {InfinizeIcon} from '../common';
import NoSearchResults from './noSearchResults';
import students from '@/data/search/searchResults.json';
export default function AdvancedSearchForm() {
    const router = useRouter();
    const [expanded, setExpanded] = useState({});
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState([]);
    const [filterChips, setFilterChips] = useState([]);
    const [isShowResults, setIsShowResults] = useState(false);
    const sectionRefs = useRef({});

    const handleAccordionChange = section => (event, isExpanded) => {
        setExpanded(prev => ({
            ...prev,
            [section]: isExpanded
        }));

        // Scroll to the expanded section
        if (isExpanded && sectionRefs.current[section]) {
            sectionRefs.current[section].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const isSearchDisabled = !Object.values(formData).some(section =>
        (Array.isArray(section) ? section : [section]).some(obj =>
            obj && typeof obj === 'object'
                ? Object.values(obj).some(
                      value =>
                          value &&
                          value !== 0 &&
                          !(
                              Array.isArray(value) &&
                              (value.length === 0 ||
                                  value.every(v => v === null))
                          )
                  )
                : obj && obj !== 0
        )
    );

    const updateSectionData = data => {
        setFormData({...formData, ...data});
    };

    const handleReset = () => {
        setFormData([]);
        // TODO: Implement reset logic
    };

    const handleSearch = () => {
        setIsShowResults(prev => !prev);
        console.log('formdata', formData);

        // TODO: Implement search logic
    };

    const handleCancel = () => {
        router.back();
    };

    const handleSave = value => {
        // TODO: Implement search logic
    };

    return (
        <Box>
            {!isShowResults ? (
                <Box
                    className={
                        advancedSearchStyles.infinize__advancedSearch__container
                    }
                >
                    <Box
                        className={
                            advancedSearchStyles.infinize__advancedSearch__title
                        }
                    >
                        <Typography variant="h5" gutterBottom m={0}>
                            Advanced search
                        </Typography>
                        <Box display={'flex'} gap={1} alignContent={'baseline'}>
                            <IconButton
                                aria-label="reset"
                                className={
                                    studentSearchStyles.infinize__savedSearches
                                }
                                onClick={handleReset}
                            >
                                <InfinizeIcon icon={'system-uicons:reset'} />
                            </IconButton>
                            <Box
                                className={
                                    studentSearchStyles.infinize__savedSearches
                                }
                            >
                                <SavedSearchesPopup
                                    topAlignment="right"
                                    bottomAlignment="left"
                                    anchorVertical="top"
                                    transformVertical="top"
                                />
                            </Box>
                        </Box>
                    </Box>
                    <AdvancedSearchSections
                        expanded={expanded}
                        handleAccordionChange={handleAccordionChange}
                        updateSectionData={updateSectionData}
                        formData={formData}
                        filterChips={setFilterChips}
                        chips={filterChips}
                    />
                    <Box
                        display="flex"
                        gap={2}
                        width="100%"
                        className={
                            advancedSearchStyles.infinize__advancedSearch__button__group
                        }
                    >
                        <SearchButtons
                            formData={formData}
                            handleSearch={handleSearch}
                            handleCancel={handleCancel}
                            setOpen={setOpen}
                            isSearchDisabled={isSearchDisabled}
                        />
                        <SaveSearchDialog
                            open={open}
                            onClose={() => setOpen(false)}
                            onSave={handleSave}
                        />
                    </Box>
                </Box>
            ) : (
                <Box width="100%">
                    <NoSearchResults
                        rows={students}
                        query={'Smith'}
                        isDisplay={true}
                        chips={filterChips}
                        Click={handleSearch}
                    />
                </Box>
            )}
        </Box>
    );
}
