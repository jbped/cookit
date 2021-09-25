import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Redux State.... 
import { useSelector, useDispatch } from 'react-redux';
import { newRecipe } from '../../../utils/globalSlice';

// MUI Components....
import {
  Box,
  Button,
} from '@mui/material'


// Icons....
import {
  MdLibraryAdd
} from "react-icons/md";

// Custom Components.... 
import EditableIngredient from '../EditableIngredient';

// Custom SCSS.... 
import '../../../scss/textfields.scss'

export default function IngredientsSection() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();
  const [deleteDroppable, setDeleteDroppable] = useState(false)


  const { columns, columnOrder, ingredients } = recipeForm;

  console.log(columns)

  const handleChange = e => {
    dispatch(newRecipe({ [e.target.name]: e.target.value }))
    console.log(recipeForm)
  }

  const ingredientDragEnd = result => {
    console.log(result)
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const column = columns[source.droppableId];
    const newIngredientIds = Array.from(column.ingredientIds);
    console.log('newIngredientIds', newIngredientIds)

    newIngredientIds.splice(source.index, 1);
    newIngredientIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      ingredientIds: newIngredientIds
    }

    const newState = {
      columns: {
        ...columns,
        [newColumn.id]: newColumn
      }
    }

    dispatch(newRecipe(newState))
    console.log(recipeForm.columns)
  }

  const beforeDragStart = start => {
    console.log(start)
    setDeleteDroppable(!deleteDroppable)
  }

  const afterDragEnd = result => {
    setDeleteDroppable(!deleteDroppable)

  }
  return (
    <>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'grey.300'
      }}>
        <h2>Ingredients</h2>
      </Box>
      <DragDropContext
        onBeforeDragStart={beforeDragStart}
        // onDragUpdate
        onDragEnd={ingredientDragEnd}
        onAfterDragEnd={afterDragEnd}
      >
        <Droppable droppableId={columns.ingredientsCol.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.ingredientsCol.ingredientIds.map((ingredient, i) => <EditableIngredient key={ingredients[ingredient].id} ing={ingredients[ingredient]} index={i}></EditableIngredient>)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId={columns.deleteCol.id}>
          {(provided) => {
            deleteDroppable && (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  position: 'fixed',
                  bottom: '1em',
                  left: '25%',
                  right: '25%',
                  width: '50%',
                  zIndex: 100,
                  borderRadius: '4px',
                  textAlign: 'center',
                  backgroundColor: 'red',
                  padding: 'auto'
                }}
              >
                <h4 style={{ margin: '2vh' }}>Delete Ingredient</h4>
                {columns.deleteCol.deleteIds.map((ingredient, i) => <EditableIngredient key={ingredients[ingredient].id} ing={ingredients[ingredient]} index={i}></EditableIngredient>)}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>


      </DragDropContext>
      <Button variant="text"
        sx={{
          textTransform: 'none',
          fontSize: 16,
          fontWeight: 'lighter',
          fontStyle: 'italic',
          color: 'primary'
        }}>
        <MdLibraryAdd />&nbsp;Add a new ingredient
      </Button>
    </>
  )
}