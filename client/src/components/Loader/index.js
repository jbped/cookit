import React from 'react'

import Box from '@mui/material/Box';
import { CircularProgress, Typography } from '@mui/material';

export default function Loader() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <Typography variant="h2" component="div" color="primary" fontWeight="bold" sx={{ flexGrow: 1, textAlign: 'center', m: 0 }}>
        Coo<Typography component="span" variant="h2" color="secondary" fontStyle="italic" fontWeight="bold" sx={{ flexGrow: 1 }}>Kit</Typography>
      </Typography>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        color="secondary"
        sx={{
          animationDuration: '550ms',
        }}
        size={75}
        thickness={6}
      />
    </Box>
  )
} 