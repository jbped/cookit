import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
  Typography,
  Paper, 
} from '@mui/material'

// Icons....
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

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
        <Box component="div"
          id={stepId}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Paper sx={{
            mt: 2,
            py: 2,
            width: '100%',
            border: 1,
            borderRadius: 1,
            boxShadow: 4,
            borderColor: 'backdrop.dark',
            // backgroundColor: 'backdrop.dark',
            // backdropFilter: 'blur(4px)'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <TextField
                id="outlined-size-small"
                size="small"
                label="Step"
                name="stepText"
                type="text"
                multiline
                defaultValue={stepText}
                color="backdrop"
                sx={{
                  width: '100%',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  flexGrow: '1',
                  ml:2
                }}
                fullWidth
                InputLabelProps={{ shrink: true, color: 'secondary' }}
                onBlur={handleChange}
              />
              <Box component="div" {...provided.dragHandleProps} sx={{marginLeft: 'auto', px: 2, py: 1, color: "grey"}}>
                <DragIndicatorIcon size={15} color="grey"/>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
    </Draggable>
  )
}