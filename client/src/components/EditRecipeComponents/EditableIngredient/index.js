import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { editRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  TextField,
  Box,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'

// Icons....
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";


// Custom SCSS.... 
import '../../../scss/textfields.scss'

export default function EditableIngredient({ ing, index }) {
  const state = useSelector(state => state.global.editRecipe)
  const dispatch = useDispatch();

  const { ingredients } = state;
  const ingObj = {...ingredients[ing.ingredientId]}

  const { ingredientId, quantity, measurementTypeShort, ingredient, notes, errors } = ingObj;

  const measurementTypes = [
    {
      type: 'Not applicable',
      short: 'n/a'
    },
    {
      type: 'teaspoon(s)',
      short: 'tsp'
    },
    {
      type: 'tablespoon(s)',
      short: 'Tbsp'
    },
    {
      type: 'cup(s)',
      short: 'c'
    },
    {
      type: 'ounces(s)',
      short: 'oz'
    },
    {
      type: 'pound(s)',
      short: 'lbs'
    },
    {
      type: 'gram(s)',
      short: 'g'
    },
    {
      type: 'kilogram(s)',
      short: 'kg'
    },
    {
      type: 'fluid ounce(s)',
      short: 'fl oz'
    },
    {
      type: 'pint(s)',
      short: 'pt'
    },
    {
      type: 'quart(s)',
      short: 'qt'
    },
    {
      type: 'gallon(s)',
      short: 'gal'
    },
    {
      type: 'milliliter(s)',
      short: 'mL'
    },
    {
      type: 'liter(s)',
      short: 'L'
    },

  ]

  const handleChange = e => {
    let editedIngObj = {...ingObj}
    if (e.target.name === 'measurementType') {
      let { type, short } = measurementTypes.find(measurement => measurement.short === e.target.value);
      editedIngObj =  { ...editedIngObj, measurementType: type, measurementTypeShort: short };
      // console.log(type, short);
    } else {
      editedIngObj = {...editedIngObj, [e.target.name]: e.target.value}
    }
    dispatch(editRecipe({
      ingredients: {
        ...ingredients,
        [ingredientId]: editedIngObj
      }
    }));
    // console.log('ingredients', ingredients);
    // console.log('ingredients[id]', ingredients[id]);
  }

  return (

    <Draggable draggableId={ingredientId} index={index}>
      {(provided) => (
        <div
          id={ingredientId}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Paper 
            sx={{
              mt: 2,
              py: 2,
              width: '100%',
              border: 1,
              borderRadius: 1,
              boxShadow: 4,
              borderColor: 'backdrop.dark',
            }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              mx: 2,
            }}>
              <div className="TextField-no-border-right">
                <TextField
                  id="outlined-size-small"
                  size="small"
                  label="Quantity"
                  name="quantity"
                  type="text"
                  defaultValue={quantity}
                  error={errors.quantity}
                  color="backdrop"
                  sx={{
                    width: 100,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    flexGrow: '1'
                  }}
                  InputLabelProps={{ shrink: true, color: 'secondary' }}
                  onBlur={handleChange}
                />
              </div>
              <div className="TextField-no-border-left" style={{ marginLeft: '-1px' }}>
                <TextField
                  id="outlined-size-small"
                  size="small"
                  select
                  label="Type"
                  name="measurementType"
                  // defaultValue={ing.measurementTypeShort}
                  value={measurementTypeShort}
                  color="backdrop"
                  InputLabelProps={{ shrink: true, color: 'secondary' }}
                  SelectProps={{ renderValue: option => option }}
                  sx={{
                    width: 80,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  onChange={handleChange}
                >
                  {measurementTypes.map(option => (
                    <MenuItem key={option.short} value={option.short}>
                      {option.type} - {option.short}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <Box component="div" {...provided.dragHandleProps} sx={{marginLeft: 'auto', px: 2, py: 1, color: "grey"}}>
                <DragIndicatorIcon size={15} color="grey"/>
              </Box>
            </Box>
            {errors.ingredient && <Typography variant="subtitle2" color="error" sx={{mx:2}}>Ingredient quantity is required</Typography>}
            <Box
              sx={{
                mt: 2,
                mx: 2,
              }}>
              <TextField
                id="outlined-size-small"
                size="small"
                label="Ingredient"
                name="ingredient"
                type="text"
                defaultValue={ingredient}
                error={errors.ingredient}
                color="backdrop"
                sx={{
                  width: '100%',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  flexGrow: '1'
                }}
                fullWidth
                InputLabelProps={{ shrink: true, color: 'secondary' }}
                onBlur={handleChange}
              />
              {errors.ingredient && <Typography variant="subtitle2" color="error">Please provide an ingredient</Typography>}
            </Box>
            <Box
              sx={{
                mt: 2,
                mx: 2,
              }}>
              <TextField
                id="outlined-size-small"
                size="small"
                label="Notes"
                name="notes"
                type="text"
                multiline
                defaultValue={notes}
                color="backdrop"
                sx={{
                  width: '100%',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  flexGrow: '1'
                }}
                fullWidth
                InputLabelProps={{ shrink: true, color: 'secondary' }}
                onBlur={handleChange}
              />
            </Box>
          </Paper>
        </div>
      )}
    </Draggable>
  )
}