import React from 'react'

import {
  Box, 
  Typography,
} from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error';

export default function UnknownPage() {
  return (
    <Box sx={{width: '100%', height: 'calc(100vh - 55px)', pt: 'calc(100vh - 80vh)', display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', }}>
      <ErrorIcon sx={{fontSize: 80}} color='backdrop'/>
      <Typography variant="h4" sx={{textAlign:'center', pt: 2}} color='backdrop.main'>Uh-oh! It appears what you are looking for can't be found here!</Typography>
    </Box>
  )
}