import {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton,
    Box,
    List,
    ListItem
} from '@mui/material';
import {InfinizeIcon} from '@/components/common';
import rationaleData from '@/data/coursePlan/rationale.json';
import classes from '../coursePlan.module.css';

export default function RationaleDialog({open, onClose}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            className={classes.infinize__rationaleDialog}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '16px',
                    padding: '30px',
                    boxShadow: 'none'
                }
            }}
        >
            <DialogTitle
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                color="primary"
                sx={{padding: 0}}
            >
                {rationaleData.title}
                <IconButton onClick={onClose}>
                    <InfinizeIcon
                        icon="basil-cross-solid"
                        style={{color: 'black', cursor: 'pointer'}}
                    />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.infinize__rationaleDialogContent}>
                {/* Description with bold formatting */}
                {rationaleData.description && (
                    <Typography variant="body1" gutterBottom>
                        {rationaleData.description
                            .split('**')
                            .map((part, idx) =>
                                idx % 2 === 1 ? (
                                    <strong key={idx}>{part}</strong>
                                ) : (
                                    part
                                )
                            )}
                    </Typography>
                )}

                <Typography variant="h5" color="primary" mt={2}>
                    Features
                </Typography>

                {rationaleData.features.map((feature, index) => (
                    <Box
                        key={index}
                        mt={2}
                        className={classes.infinize__rationaleDialogFeatures}
                    >
                        <Typography variant="h6">{feature.title}</Typography>

                        {/* Steps as a list */}
                        <List sx={{listStyleType: 'disc', paddingLeft: 3}}>
                            {feature.steps?.map((step, stepIndex) => (
                                <ListItem
                                    key={stepIndex}
                                    sx={{display: 'list-item'}}
                                >
                                    {step
                                        .split('**')
                                        .map((part, idx) =>
                                            idx % 2 === 1 ? (
                                                <strong key={idx}>
                                                    {part}
                                                </strong>
                                            ) : (
                                                part
                                            )
                                        )}
                                </ListItem>
                            ))}
                        </List>

                        {/* Handle description if present */}
                        {feature.description && (
                            <Typography variant="body1" mt={1}>
                                {feature.description
                                    .split('**')
                                    .map((part, idx) =>
                                        idx % 2 === 1 ? (
                                            <strong key={idx}>{part}</strong>
                                        ) : (
                                            part
                                        )
                                    )}
                            </Typography>
                        )}
                    </Box>
                ))}

                {/* Final Thought Section */}
                {rationaleData.features.some(
                    f => f.title === 'Final Thought'
                ) && (
                    <Box mt={3}>
                        <Typography variant="h6">Final Thought</Typography>
                        <Typography variant="body1">
                            {rationaleData.features
                                .find(f => f.title === 'Final Thought')
                                ?.description.split('**')
                                .map((part, idx) =>
                                    idx % 2 === 1 ? (
                                        <strong key={idx}>{part}</strong>
                                    ) : (
                                        part
                                    )
                                )}
                        </Typography>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}
