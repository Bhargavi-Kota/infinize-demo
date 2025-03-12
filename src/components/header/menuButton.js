'use client';

import {Box, IconButton, Menu, MenuItem} from '@mui/material';
import {useState} from 'react';
import {InfinizeIcon} from '../common';
import classes from './header.module.css';

export default function MenuButton() {
    const [anchor, setAnchor] = useState(false);

    const handleClick = () => {
        setAnchor(!anchor);
    };

    return (
        <Box>
            <IconButton
                id="menu-button"
                aria-controls={anchor ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={anchor ? 'true' : undefined}
                onClick={handleClick}
            >
                <InfinizeIcon
                    icon="iconamoon:arrow-down-2-duotone"
                    className={classes.infinize__Header}
                />
            </IconButton>
            <Menu
                id="account-menu"
                anchorEl={anchor}
                open={anchor}
                onClose={handleClick}
                MenuListProps={{
                    'aria-labelledby': 'account-menu'
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem onClick={handleClick}>Logout</MenuItem>
            </Menu>
        </Box>
    );
}
