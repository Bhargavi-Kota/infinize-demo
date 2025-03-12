'use client';
import {Box, Button, Typography} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function NoPlan({title, description, link, button, OpenModal}) {
    return (
        <Box className="noPlan">
            <Image
                src="/img/coursePlan.svg"
                alt="Illustration depicting plan creation"
                width={300}
                height={300}
            />
            <Typography variant="h2" color="primary">
                {title}
            </Typography>
            <Typography variant="body1">{description}</Typography>
            {link ? (
                <Link href={link} passHref>
                    <Button
                        className="noPlanButton"
                        aria-label="Create a new plan"
                        sx={{textTransform: 'none'}}
                    >
                        {button}
                    </Button>
                </Link>
            ) : (
                <Button
                    className="noPlanButton"
                    aria-label="Create a new plan"
                    onClick={OpenModal}
                    sx={{textTransform: 'none'}}
                >
                    {button}
                </Button>
            )}
        </Box>
    );
}
