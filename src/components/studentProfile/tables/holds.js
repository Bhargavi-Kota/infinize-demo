import {InfinizeTable} from '@/components/common';
import {Box, Skeleton} from '@mui/material';
import React, {useState} from 'react';
import data from '@/data/studentProfile/tableData.json';
import {holdsColumns} from './tableColumns';

export function Holds({isLoading = true}) {
    const [tableData] = useState(data.holds || []);

    return (
        <>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
                <Box>
                    <InfinizeTable columns={holdsColumns} rows={tableData} />
                </Box>
            )}
        </>
    );
}
