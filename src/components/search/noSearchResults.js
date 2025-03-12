'use client';

import {DataGrid} from '@mui/x-data-grid';
import columns from './columns';
import {useTheme} from '@mui/material/styles';
import classes from './search.module.css';
import {Box, Typography, Button, Chip} from '@mui/material';
import {InfinizeIcon} from '../common';
import NoResultsPlaceholder from './noResultsPlaceholder ';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useEffect, useState} from 'react';

export default function NoSearchResults({rows = [], Click, chips}) {
    const theme = useTheme();

    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(true);

    const processedColumns = columns.map(col => ({
        ...col,
        flex: col.flex ?? 1,
        minWidth: col.minWidth ?? 200
    }));
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <Box
            sx={{
                width: isSmallScreen
                    ? '100vw'
                    : isMediumScreen
                    ? 'calc(100vw - 80px)'
                    : 'calc(100vw - 312px)',
                transition: 'width 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                padding: isSmallScreen ? 1 : 2,
                overflowX: 'hidden',
                margin: 'auto'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        display="flex"
                        alignItems="center"
                        gap="15px"
                    >
                        <Box className={classes.infinize__searchResultsIcon}>
                            <InfinizeIcon
                                icon="fluent:people-search-24-regular"
                                style={{color: 'white'}}
                            />
                        </Box>
                        Search Results
                        {chips && (
                            <Box display="flex" flexWrap="wrap" gap={0.5}>
                                {Object.entries(chips).flatMap(
                                    ([section, fields]) =>
                                        Object.entries(fields)
                                            .filter(([key, value]) => value)
                                            .map(([key, value]) => (
                                                <Chip
                                                    key={key}
                                                    label={value}
                                                    className="infinize__chip"
                                                />
                                            ))
                                )}
                            </Box>
                        )}
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white'
                        }}
                        className={classes.infinize__advanceSearch}
                        aria-label="Advanced search"
                        startIcon={
                            <InfinizeIcon
                                icon="iconamoon:search"
                                width={20}
                                height={20}
                                style={{color: 'white'}}
                            />
                        }
                        onClick={Click}
                    >
                        Advanced Search
                    </Button>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        height: isSmallScreen ? '55vh' : '60vh',
                        overflow: 'hidden'
                    }}
                >
                    <DataGrid
                        rows={loading ? [] : rows}
                        columns={processedColumns}
                        slots={{noRowsOverlay: () => <NoResultsPlaceholder />}}
                        initialState={{
                            pagination: {
                                paginationModel: {pageSize: 10, page: 0}
                            }
                        }}
                        pageSizeOptions={[10, 25, 50, 75, 100]}
                        disableRowSelectionOnClick
                        isRowSelectable={() => false}
                        loading={loading}
                        autoHeight={false}
                        sx={{
                            '& .MuiDataGrid-container--top [role=row], & .MuiDataGrid-container--bottom [role=row]':
                                {
                                    backgroundColor: theme.palette.primary.main,
                                    color: '#fff'
                                },
                            '& .MuiDataGrid-root': {
                                overflow: 'hidden'
                            },

                            [theme.breakpoints.down('md')]: {
                                '& .MuiDataGrid-columnHeaders': {
                                    fontSize: '12px'
                                },
                                '& .MuiDataGrid-cell': {
                                    fontSize: '10px'
                                }
                            }
                        }}
                        className={`${classes.infinize__dataGrid} infinize__customScrollbar`}
                    />
                </Box>
            </Box>
        </Box>
    );
}
