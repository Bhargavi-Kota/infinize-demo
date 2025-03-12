import {InfinizeTable} from '@/components/common';
import {Box, Skeleton} from '@mui/material';
import React, {useState} from 'react';
import data from '@/data/studentProfile/tableData.json';
import {housingColumns} from './tableColumns';

export function Housing({isLoading = true}) {
    const [tableData, setTableData] = useState(data.housing || []);

    return (
        <>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
                <Box>
                    <InfinizeTable columns={housingColumns} rows={tableData} />
                </Box>
            )}
        </>
    );
}
