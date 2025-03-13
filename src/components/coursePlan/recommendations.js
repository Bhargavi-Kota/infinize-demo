'use client';
import {
    Typography,
    Box,
    Stack,
    useTheme,
    Tooltip,
    Skeleton
} from '@mui/material';
import classes from './coursePlan.module.css';
import data from '@/data/coursePlan/recommendations.json';
import {InfinizeIcon} from '../common';
export default function Recommendations({customStyles = {}, loader}) {
    const theme = useTheme();
    return (
        <>
            {loader ? (
                <Box width="100%" maxWidth="900px" minWidth="700px">
                    <Skeleton variant="rectangular" width="100%" height={150} />
                    <Box mt={2} />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                    <Box mt={2} />
                    <Skeleton variant="rectangular" width="100%" height={250} />
                    <Box mt={2} />
                    <Skeleton variant="rectangular" width="100%" height={250} />
                </Box>
            ) : (
                <Box
                    className={classes.infinize__coursePlanRecommendations}
                    sx={customStyles}
                >
                    <Box className={classes.infinize__recommendationsHeading}>
                        <Box className="infinize__IconOuter">
                            <InfinizeIcon
                                icon="fluent:hat-graduation-sparkle-24-filled"
                                style={{color: theme.palette.primary.main}}
                            />
                        </Box>
                        <Typography variant="h2" color="primary">
                            Additional Recommendations
                        </Typography>
                    </Box>

                    <Box
                        className={classes.infinize__recommendationsCards}
                        display="grid"
                        gridTemplateColumns={{sm: '1fr', md: '1fr 1fr'}}
                        rowGap={4}
                        columnGap={2}
                    >
                        {Object.entries(data.recommendations).map(
                            ([category, items], index) => (
                                <Box
                                    className="infinize__recommendationsCard"
                                    sx={{mb: 2, height: '100%'}}
                                    key={index}
                                >
                                    <Tooltip title={category}>
                                        <Typography
                                            variant="h4"
                                            color="primary"
                                        >
                                            {category}
                                        </Typography>
                                    </Tooltip>
                                    {items.map((item, index) => (
                                        <Stack
                                            key={index}
                                            direction="row"
                                            spacing={1}
                                            alignItems="start"
                                            justifyContent="start"
                                            className={
                                                classes.infinize__recommendationsList
                                            }
                                        >
                                            <InfinizeIcon
                                                icon="mdi-tick"
                                                style={{color: '#656565'}}
                                                width="20px"
                                                height="20px"
                                            />
                                            <Typography> {item}</Typography>
                                        </Stack>
                                    ))}
                                </Box>
                            )
                        )}
                    </Box>
                </Box>
            )}
        </>
    );
}
