import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box
} from '@mui/material'

// Icons....
import {
  GrDrag
} from "react-icons/gr";

export default function EditableStep({ step, index }) {
  const state = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();

  const { directions } = state;
  const dirObj = { ...directions[step.stepId] }
  console.log('dirObj', dirObj)

  const { stepId, stepText } = dirObj

  const handleChange = e => {
    let editedDirObj = { ...dirObj }
    console.log('editedDirObj', editedDirObj)
    editedDirObj = { ...editedDirObj, [e.target.name]: e.target.value }
    dispatch(newRecipe({
      directions: {
        ...directions,
        [stepId]: editedDirObj
      }
    }))
    console.log('directions', directions);
    console.log('directions[stepId]', directions[stepId]);
  }

  return (
    <Draggable draggableId={stepId} index={index}>
      {(provided) => (
        <div
          id={stepId}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Box sx={{
            mt: 2,
            py: 2,
            width: '100%',
            border: 1,
            borderRadius: '4px',
            borderColor: 'grey.300',
            backgroundColor: '#FFFFFFD9',
            backdropFilter: 'blur(4px)'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              mx: 2,
            }}>
              <TextField
                id="outlined-size-small"
                size="small"
                label="Step"
                name="stepText"
                type="text"
                multiline
                defaultValue={stepText}
                sx={{
                  width: '100%',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  flexGrow: '1'
                }}
                fullWidth
                InputLabelProps={{ shrink: true }}
                onBlur={handleChange}
              />
              <div {...provided.dragHandleProps} style={{marginLeft: 'auto', padding: '.2rem'}}>
                <GrDrag size={15} />
              </div>
            </Box>
          </Box>
        </div>
      )}
    </Draggable>
  )
}