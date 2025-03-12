'use client';
import {useState} from 'react';
import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
    useTheme,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon
} from '@mui/material';
import {InfinizeIcon} from '@/components/common';

export default function WidgetCard({
    title,
    date,
    description,
    icon,
    onClick,
    isNotes,
    name,
    attachment,
    data,
    type
}) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showBlueDot, setShowBlueDot] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const open = Boolean(anchorEl);

    const handleMenuOpen = event => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAction = action => {
        handleMenuClose();
        if (action === 'acknowledge') {
            setShowBlueDot(false);
        } else if (action === 'dismiss') {
            console.log('dismiss');
        }
    };

    if (!isVisible) return null;
    return (
        <Box className="widgetCard">
            {!isNotes && (
                <Box id="eyeIcon">
                    <InfinizeIcon icon="mingcute:eye-line" />
                    {!data && (
                        <Box
                            sx={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '-3px',
                                right: '0px'
                            }}
                        />
                    )}
                </Box>
            )}

            <Stack direction="row" spacing={2} alignItems="start">
                <IconButton className="nudgeIcon">
                    <InfinizeIcon
                        icon={icon}
                        style={{color: theme.palette.primary.main}}
                    />
                </IconButton>
                <Stack spacing={1}>
                    <Tooltip title={title}>
                        <Typography variant="h4">{title}</Typography>
                    </Tooltip>

                    <Typography variant="body2" id="date">
                        {date}
                    </Typography>
                </Stack>
            </Stack>
            {isNotes ? (
                <Stack className="widgetCardNotes" spacing={2}>
                    <hr />
                    <Typography variant="h5">
                        Created by: <span>{name}</span>
                    </Typography>
                </Stack>
            ) : (
                ' '
            )}
            <Typography variant="body1">{description}</Typography>
            {isNotes ? (
                <Box display="flex" alignItems="center" gap={'4px'}>
                    <Typography variant="h5">Attachment: </Typography>
                    {attachment ? (
                        <>
                            <Typography variant="h5">{attachment}</Typography>

                            <InfinizeIcon
                                icon="solar:file-download-outline"
                                width={12}
                            />
                        </>
                    ) : (
                        <Typography variant="h5">None</Typography>
                    )}
                </Box>
            ) : (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                >
                    <Typography variant="body1">{data}</Typography>
                    {!data && (
                        <Button
                            onClick={handleMenuOpen}
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                textTransform: 'none'
                            }}
                            className="actionButton"
                        >
                            Actions
                            <InfinizeIcon
                                icon="tabler:chevron-right"
                                width="18px"
                            />
                        </Button>
                    )}
                </Stack>
            )}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0px 3px 12px 0px rgba(0, 0, 0, 0.25)',
                        padding: '5px 10px',
                        marginLeft: '10px',
                        marginTop: '-40px'
                    }
                }}
            >
                {type === 'nudge' ? (
                    <MenuItem
                        onClick={() => handleAction('generate')}
                        className="menuItem"
                    >
                        <ListItemIcon>
                            <InfinizeIcon
                                icon="hugeicons:touchpad-02"
                                style={{color: '#5A6876'}}
                            />
                        </ListItemIcon>
                        Generate Nudge
                    </MenuItem>
                ) : (
                    <MenuItem
                        onClick={() => handleAction('send')}
                        className="menuItem"
                    >
                        <ListItemIcon>
                            <InfinizeIcon
                                icon="pepicons-pop:hands-clapping"
                                style={{color: '#5A6876'}}
                            />
                        </ListItemIcon>
                        Sent Kudos
                    </MenuItem>
                )}
                <MenuItem
                    onClick={() => handleAction('dismiss')}
                    className="menuItem"
                >
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="fluent:dismiss-circle-12-regular"
                            style={{color: '#5A6876'}}
                        />
                    </ListItemIcon>
                    Dismiss
                </MenuItem>
                <MenuItem
                    onClick={() => handleAction('acknowledge')}
                    className="menuItem"
                >
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="iconamoon:like"
                            style={{color: '#5A6876'}}
                        />
                    </ListItemIcon>
                    Acknowledge
                </MenuItem>
            </Menu>
        </Box>
    );
}
