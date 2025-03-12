'use client';
import {
    Box,
    Stack,
    Typography,
    IconButton,
    colors,
    Button
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import columns from './columns';
import students from '@/data/search/searchResults.json';
import classes from './search.module.css';
import {useTheme} from '@mui/material/styles';
import {InfinizeIcon} from '../common';
export default function SearchResults({
    query,
    isDisplay = false,
    buttonAlignment = 'end',
    Click
}) {
    const theme = useTheme();

    return (
        <Stack spacing={2}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography
                    variant="h2"
                    color="primary"
                    display="flex"
                    alignItems="center"
                    gap="15px"
                >
                    <Box className={classes.infinize__searchResultsIcon}>
                        <InfinizeIcon
                            icon="fluent:people-search-24-regular"
                            style={{
                                color: 'white'
                            }}
                        />
                    </Box>
                    {query ? `Search Results for "${query}"` : 'Search Results'}
                </Typography>
                {isDisplay && (
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            alignSelf: buttonAlignment
                        }}
                        className={classes.infinize__advanceSearch}
                        aria-label="Advanced search"
                        startIcon={
                            <InfinizeIcon
                                icon="iconamoon:search"
                                style={{
                                    color: 'white'
                                }}
                            />
                        }
                        onClick={() => Click(false)}
                    >
                        Advanced Search
                    </Button>
                )}
            </Box>

            <Box sx={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={students}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {pageSize: 10, page: 0}
                        }
                    }}
                    pageSizeOptions={[10, 25, 50, 75, 100]}
                    disableRowSelectionOnClick
                    isRowSelectable={() => false}
                    sx={{
                        '& .MuiDataGrid-container--top [role=row], & .MuiDataGrid-container--bottom [role=row]':
                            {
                                backgroundColor: theme.palette.primary.main,
                                color: '#fff'
                            },
                        '& .mui-155wbr6-MuiButtonBase-root-MuiIconButton-root':
                            {
                                color: 'white'
                            }
                    }} // TODO: remove inline styling
                    className={classes.infinize__dataGrid}
                />
            </Box>
        </Stack>
    );
}
