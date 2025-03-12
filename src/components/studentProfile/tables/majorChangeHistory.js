import {InfinizeTable} from '@/components/common';
import {Box, Skeleton} from '@mui/material';
import React, {useState} from 'react';
import data from '@/data/studentProfile/tableData.json';
import {majorChangeHistoryColumns} from './tableColumns';

export function MajorChangeHistory({isLoading = true}) {
    const [tableData, setTableData] = useState(data.majorChangeHistory || []);

    return (
        <>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={200} />
            ) : (
                <Box>
                    <InfinizeTable
                        columns={majorChangeHistoryColumns}
                        rows={tableData}
                    />
                </Box>
            )}
        </>
    );
}
