import {Button} from '@mui/material';
import classes from './search.module.css';
import Link from 'next/link';
import {useTheme} from '@mui/material/styles';

export default function AdvancedSearchButton({buttonAlignment = 'end'}) {
    const theme = useTheme();
    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                alignSelf: buttonAlignment
            }}
            className={classes.infinize__advanceSearch}
            aria-label="Advanced search"
            component={Link}
            href="/search/advanced"
        >
            Advanced Search
        </Button>
    );
}
