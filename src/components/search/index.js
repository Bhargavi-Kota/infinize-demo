'use client';
import {useState} from 'react';
import {Box} from '@mui/material';
import classes from './search.module.css';
import BasicSearch from './basicSearch';
import BasicSearchResults from './basicSearchResults';

export default function Search() {
    const [isShowResults, setIsShowResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = query => {
        setSearchQuery(query);
        setIsShowResults(true);
    };
    return (
        <Box
            className={classes.infinize__searchResultBox}
            sx={{
                width: '100%',
                overflow: 'hidden',
                alignItems: isShowResults ? '' : 'center',
                justifyContent: isShowResults ? '' : 'center'
            }}
        >
            {!isShowResults ? (
                <BasicSearch onSearch={handleSearch} />
            ) : (
                <BasicSearchResults
                    query={searchQuery}
                    onSearch={handleSearch}
                />
            )}
        </Box>
    );
}
