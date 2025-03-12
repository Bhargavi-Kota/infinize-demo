import {InfinizeTable} from '@/components/common';
import {Box, Skeleton} from '@mui/material';
import React, {useState} from 'react';
import data from '@/data/studentProfile/tableData.json';
import {creditsCompletedColumns} from './tableColumns';

export function CreditsCompleted({isLoading = true}) {
    const [tableData, setTableData] = useState(data.creditsCompleted || []);

    return (
        <>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
                <Box>
                    <InfinizeTable
                        columns={creditsCompletedColumns}
                        rows={tableData}
                    />
                </Box>
            )}
        </>
    );
}
