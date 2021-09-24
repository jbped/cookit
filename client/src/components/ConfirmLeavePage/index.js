import React, { useEffect } from 'react'
import { Prompt, isPrompt } from 'react-router'

import {
  TextField,
  Box,
  MenuItem,
} from '@mui/material'

export default function ConfirmLeavePage(props) {

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)

    return () => {
      window.removeEventListener('beforeunload', alertUser)

    }
  }, [])
  const alertUser = e => {
    e.preventDefault()
    e.returnValue = ''
  }

  return (
    <Box>
      <Prompt
        when={props.completed}
        message={() => 'You have unsaved changes! Please save!'}
      />
    </Box>
  )
}