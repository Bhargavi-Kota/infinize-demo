'use client';
import {Box, Typography, List, ListItem} from '@mui/material';
import {PieChart, Pie, Cell} from 'recharts';
import data from '@/data/studentProfile/credits.json';
import {useState} from 'react';
import classes from './studentDetails.module.css';

export default function Credits() {
    const [creditsData, setCreditsData] = useState(data.data || []);
    return (
        <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
            <Typography
                variant="h3"
                fontWeight="bold"
                color="primary.main"
                textAlign={'center'}
            >
                Credits
            </Typography>

            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <PieChart width={80} height={80}>
                    <Pie
                        data={creditsData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={38}
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={0}
                        fill="#8884d8"
                    >
                        {creditsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>

                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        className={classes.infinize__credits}
                    >
                        {data.totalCredits}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.infinize__creditsText}
                    >
                        Credits
                    </Typography>
                </Box>
            </Box>

            <List dense sx={{p: 0}}>
                {creditsData.map((item, index) => (
                    <ListItem
                        key={index}
                        disableGutters
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 1,
                            width: '100%',
                            p: 0
                        }}
                    >
                        <Box
                            sx={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                backgroundColor: item.color,
                                flexShrink: 0
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: '8px',
                                color: 'text.secondary',
                                flex: 1,
                                textAlign: 'left'
                            }}
                        >
                            {item.name}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: '8px',
                                color: 'text.primary',
                                fontWeight: 'bold',
                                flexShrink: 0,
                                textAlign: 'right'
                            }}
                        >
                            {item.value}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
