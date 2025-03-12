'use client';
import React from 'react';
import {Box} from '@mui/material';
import {keyframes} from '@mui/system';

// Define animations
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const glow = keyframes`
  0% {
    filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.5));
  }
  50% {
    filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.8));
  }
  100% {
    filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.5));
  }
`;

export default function AppLoader() {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F8FAFE',
                zIndex: 9999
            }}
        >
            <Box
                component="img"
                src="/img/loaderIcon.svg"
                alt="Loading..."
                sx={{
                    width: 100,
                    height: 100,

                    animation: `${fadeIn} 1.5s ease-out, ${bounce} 1s infinite ease-in-out, ${glow} 2s infinite`
                }}
            />
        </Box>
    );
}
