'use client';
import {Menu, MenuItem, ListItemIcon} from '@mui/material';
import {InfinizeIcon} from '../../common';
import classes from '../coursePlan.module.css';
export default function CoursePlanMenu({
    anchorEl,
    handleMenuClose,
    expandAll,
    collapseAll,
    handleRegenerate,
    handleDelete,
    isEditable
}) {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: '#f8f8f8',
                    borderRadius: '8px',
                    boxShadow: '0px 3px 12px 0px rgba(0, 0, 0, 0.25)',
                    padding: '5px 10px'
                }
            }}
            className={classes.infinize__menuList}
        >
            <MenuItem
                onClick={expandAll}
                className={classes.infinize__menuItem}
            >
                <ListItemIcon>
                    <InfinizeIcon
                        icon="mingcute:list-expansion-fill"
                        style={{color: '#5A6876'}}
                    />
                </ListItemIcon>
                Expand All
            </MenuItem>
            <MenuItem
                onClick={collapseAll}
                className={classes.infinize__menuItem}
            >
                <ListItemIcon>
                    <InfinizeIcon
                        icon="mingcute:list-collapse-fill"
                        style={{color: '#5A6876'}}
                    />
                </ListItemIcon>
                Collapse All
            </MenuItem>
            {isEditable ? (
                <MenuItem
                    onClick={handleRegenerate}
                    className={classes.infinize__menuItem}
                >
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="icon-park-outline:reload"
                            style={{color: '#5A6876'}}
                        />
                    </ListItemIcon>
                    Regenerate
                </MenuItem>
            ) : (
                <MenuItem
                    onClick={handleDelete}
                    className={classes.infinize__menuItem}
                >
                    <ListItemIcon>
                        <InfinizeIcon
                            icon="fluent:delete-24-filled"
                            style={{color: '#5A6876'}}
                        />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            )}
        </Menu>
    );
}
