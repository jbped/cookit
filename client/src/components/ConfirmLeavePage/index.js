import React, { useEffect } from 'react'
import { Prompt } from 'react-router'

import {
  Box,
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