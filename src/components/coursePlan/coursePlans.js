'use client';
import {useState} from 'react';
import {
    Tabs,
    Tab,
    Box,
    Typography,
    Stack,
    Link,
    IconButton,
    Dialog
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import coursePlanData from '@/data/coursePlan/coursePlan.json';
import classes from './coursePlan.module.css';
import {InfinizeIcon} from '../common';
import CoursePlanLanding from './coursePlanCard/landing';
import Recommendations from './recommendations';

function TabPanel({children, value, index}) {
    return (
        <div hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export default function CoursePlanPage() {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);
    const [popupOpen, setPopupOpen] = useState(false);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box className={classes.infinize__coursePlanPage}>
            <Tabs
                value={selectedTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                className={classes.infinize__coursePlanPageTabs}
                sx={{
                    '.MuiTabs-flexContainer': {
                        gap: '20px',
                        borderBottom: '2px solid #ededed'
                    }
                }}
            >
                {coursePlanData.coursePlans.map((plan, index) => (
                    <Tab
                        key={plan.id}
                        label={plan.name}
                        icon={
                            <Box className="infinize__IconOuterSmall">
                                <InfinizeIcon
                                    icon="fluent:hat-graduation-sparkle-24-filled"
                                    style={{color: theme.palette.primary.main}}
                                    width="15px"
                                />
                            </Box>
                        }
                        iconPosition="start"
                        sx={{color: theme.palette.primary.main}}
                        className={classes.infinize__coursePlanPageTab}
                    />
                ))}
            </Tabs>
            {coursePlanData.coursePlans.map((plan, index) => (
                <TabPanel key={plan.id} value={selectedTab} index={index}>
                    <Box className={classes.infinize__coursePlanTermsContainer}>
                        <Box
                            className={classes.infinize__coursePlanTermCredits}
                        >
                            <Typography>
                                Total Creadits: {plan.totalCredits}
                            </Typography>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                            >
                                <Link
                                    href="#"
                                    style={{color: theme.palette.primary.main}}
                                    onClick={e => {
                                        e.preventDefault();
                                        setPopupOpen(true);
                                    }}
                                >
                                    Additional Recommendations
                                </Link>
                                <IconButton>
                                    <InfinizeIcon
                                        icon="fluent:delete-24-filled"
                                        style={{color: '#5A6876'}}
                                    />
                                </IconButton>
                            </Stack>
                        </Box>

                        <Box
                            className={classes.infinize__coursePlanLandingCards}
                            sx={{overflowX: 'auto', width: '100%'}}
                        >
                            {plan.terms.map((term, idx) => (
                                <CoursePlanLanding key={idx} term={term} />
                            ))}
                        </Box>
                    </Box>
                </TabPanel>
            ))}

            <Dialog
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                fullWidth
                maxWidth="md"
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '12px',
                        padding: '50px 20px 20px'
                    }
                }}
            >
                <IconButton
                    onClick={() => setPopupOpen(false)}
                    sx={{position: 'absolute', right: 8, top: 8}}
                >
                    <InfinizeIcon icon="mdi:close" />
                </IconButton>
                <Recommendations
                    customStyles={{width: '100%', height: '500px'}}
                />
            </Dialog>
        </Box>
    );
}
