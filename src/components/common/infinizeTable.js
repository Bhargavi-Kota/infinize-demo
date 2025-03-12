import React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Box, Paper} from '@mui/material';
import classes from './common.module.css';

export function InfinizeTable({rows, columns}) {
    return (
        <Box
            sx={{
                mt: 2,
                boxShadow: 'none',
                borderRadius: '12px',
                borderColor: 'transparent',
                height: 300
            }}
            className={classes.infinize__table}
        >
            <DataGrid
                className={classes.infinize__dataGrid}
                rows={rows}
                columns={columns}
                disableSelectionOnClick
                disableColumnResize
                hideFooterPagination
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-container--top [role=row], & .MuiDataGrid-container--bottom [role=row]':
                        {
                            backgroundColor: '#f5f5f5 !important'
                        },
                    '& .MuiDataGrid-columnSeparator': {
                        display: 'none !important'
                    },
                    '& .MuiDataGrid-footerContainer': {
                        display: 'none !important'
                    },
                    '& .mui-155wbr6-MuiButtonBase-root-MuiIconButton-root': {
                        color: 'white'
                    },
                    ' .mui-aymtem-MuiDataGrid-virtualScrollerContent': {
                        backgroundColor: '#fff'
                    },
                    '.mui-1gqmilo-MuiDataGrid-columnHeaderTitle': {
                        color: '#808A98',
                        padding: '0 10px'
                    },
                    '.MuiDataGrid-cell': {
                        padding: '0px 15px',
                        display: 'flex',
                        alignItems: 'center'
                    }
                }}
            />
        </Box>
    );
}
