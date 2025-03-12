'use client';
import {useState, useEffect} from 'react';
import {Stack, Box, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import classes from './search.module.css';
import SavedSearchesPopup from './savedSearchesPopup';
import SearchResults from './searchResults';
import BasicSearch from './basicSearch';

export default function BasicSearchResults({query}) {
    const theme = useTheme();
    const [searchResult, setSearchResult] = useState(query);
    // Function to handle new search input from BasicSearch
    const handleUpdatedSearch = newQuery => {
        if (!newQuery.trim()) return;
        setSearchResult(newQuery);
    };

    return (
        <Stack spacing={4}>
            <Stack
                spacing={3}
                component="section"
                className={classes.infinize__searchInput}
                role="search"
            >
                <Stack
                    spacing={2}
                    className={classes.infinize__searchIcon}
                    alignItems="center"
                    direction={{sm: 'column', md: 'row'}}
                >
                    <Typography
                        component="h2"
                        color={theme.palette.primary.main}
                    >
                        Search for Students
                    </Typography>
                    <Box className={classes.infinize__savedSearches}>
                        <SavedSearchesPopup />
                    </Box>
                </Stack>
                <BasicSearch
                    direction={{sm: 'column', md: 'row'}}
                    width="100%"
                    buttonAlignment="center"
                    showSavedSearches={false}
                    inputValue={searchResult}
                    onSearch={handleUpdatedSearch}
                />
            </Stack>
            <SearchResults query={searchResult} />
        </Stack>
    );
}
