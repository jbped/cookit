import React from 'react'

import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

export default function Loader() {
  return (
    <Box sx={{width: '100%', height: 'calc(100vh - 55px)', pt: 'calc(100vh - 80vh)', display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', }}>
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