import React, { useEffect, useState } from 'react'
import { useHistory, Prompt } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function ConfirmLeavePage() {
  const cleared = useSelector(state => state.global.newRecipe.formCleared)
  const [locations, setLocations] = useState([])
  const history = useHistory();
  // console.log(cleared)


  useEffect(() => {
    return history.listen(location => {
      if (history.action === 'PUSH') {
        setLocations([location.key])
      }

      if (history.action === 'POP') {
        if (locations[1] === location.key) {
          setLocations(([_, ...keys]) => keys)
          alertUser()
        } else {
          setLocations((keys) => [location.key, ...keys])
          alertUser()
        }
      }
    })
  }, [locations, ])

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
    <Prompt
      when={!cleared}
      message={() => 'You have unsaved changes! Please save your recipe before leaving!'}
    />
  )
}