'use client';
import {Box, Typography} from '@mui/material';
import {InfinizeIcon} from '.';
const RecommendationsCard = ({category, items}) => {
    return (
        <Box className="infinize__recommendationsCard " sx={{mb: 2}}>
            <Typography variant="h3" color="primary">
                {category}
            </Typography>
            {items.map((item, index) => (
                <Typography key={index} variant="body2">
                    <InfinizeIcon
                        icon="mdi-tick"
                        style={{color: '#656565'}}
                        width="20px"
                    />
                    {item}
                </Typography>
            ))}
        </Box>
    );
};

export default RecommendationsCard;
