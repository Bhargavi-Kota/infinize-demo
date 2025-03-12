import {Card, CardContent, Typography} from '@mui/material';
import LogoUpload from './logo';
import classes from './brandKit.module.css';

export default function LogoCard({logo, setLogo}) {
    return (
        <Card className={classes.infinize__brandKitCard}>
            <CardContent>
                <Typography variant="h6" color="primary.main" mb={2}>
                    Logo
                </Typography>
                <LogoUpload logo={logo} setLogo={setLogo} />
            </CardContent>
        </Card>
    );
}
