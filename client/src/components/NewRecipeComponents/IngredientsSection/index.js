import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

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
import { FaRegTrashAlt } from "react-icons/fa"

// Custom Components.... 
import EditableIngredient from '../EditableIngredient';

// Custom SCSS.... 
import '../../../scss/textfields.scss'

const DeleteDiv = styled.div`
  margin: 16px 0 0 0;
  min-height: 5vh;
  border-radius: 4px;
  text-align: center;
  background-color: ${props => props.isDraggingOver ? 'red' : 'inherit'};

`;

export default function IngredientsSection() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();
  const [newIngredient, setNewIngredient] = useState(1)

  const { columns, columnOrder, ingredients } = recipeForm;
  const { ingredientsCol, ingredientsCol: { itemIds } } = columns;

  console.log(columns)

  const handleChange = e => {
    dispatch(newRecipe({ [e.target.name]: e.target.value }))
    console.log(recipeForm)
  }

  const onDragUpdate = update => {
    console.log(update)
  }

  // Logic for when an ingredient was moved
  const onDragEnd = result => {
    // Toggle off delete droppable location
    console.log(result)
    const { destination, source, draggableId } = result;

    // If no destination was found return out of function
    if (!destination) {
      return;
    }

    // If no order change was made return out of function
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const start = columns[source.droppableId]; // draggables starting droppable column
    const finish = columns[destination.droppableId] // draggables ending droppable column 

    // If draggable droppable column remained the same, save the column order.
    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      console.log('newItemIds', newItemIds)

      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        itemIds: newItemIds
      }

      const newState = {
        columns: {
          ...columns,
          [newColumn.id]: newColumn
        }
      }

      dispatch(newRecipe(newState))
      console.log(recipeForm.columns)
      return;
    }

    // Move Items to Delete Droppable
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);

    const newStart = {
      ...start,
      itemIds: startItemIds,
    }

    const finishItemId = Array.from(finish.itemIds)
    finishItemId.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      itemIds: finishItemId
    }

    const newState = {
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    dispatch(newRecipe(newState))

    if (finish.id === 'deleteCol') {
      console.log(true)
      console.log(finishItemId.toString())
    }
  };

  const addNewIngredient = () => {
    // create ingredient id and increment newIngredient INT
    const ingredientId = `ingredient-${newIngredient}`;
    setNewIngredient(newIngredient + 1);

    // update newRecipe in global state with the ingredient in the ingredients obj and 
    const newIngIdArr = [...itemIds, ingredientId]
    dispatch(newRecipe({
      ingredients: {
        ...ingredients,
        [ingredientId]: {
          id: ingredientId,
          quantity: '',
          measurementType: '',
          measurementTypeShort: '',
          ingredient: '',
          notes: ''
        }
      },
      columns: {
        ...columns,
        ingredientsCol: {
          ...ingredientsCol,
          itemIds: newIngIdArr
        }
      }
    }))
    console.log(recipeForm)
  };

  return (
    <>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'grey.300'
      }}>
        <h2>Ingredients</h2>
      </Box>
      <DragDropContext
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId={columns.ingredientsCol.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.ingredientsCol.itemIds.map((ingredient, i) => <EditableIngredient key={ingredients[ingredient].id} ing={ingredients[ingredient]} index={i}></EditableIngredient>)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId={columns.deleteCol.id}>
          {(provided, snapshot) => (
            <>
              {ingredientsCol.itemIds.length > 0 ? (
                <DeleteDiv
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', }}>
                    <FaRegTrashAlt />
                    <p style={{ fontStyle: 'italic', fontSize: '16px', margin: 0, padding: 0 }}>&nbsp;- Drop an ingredient here</p>
                  </Box>
                  {columns.deleteCol.itemIds.map((ingredient, i) => <EditableIngredient key={ingredients[ingredient].id} ing={ingredients[ingredient]} index={i}></EditableIngredient>)}
                  {provided.placeholder}
                </DeleteDiv>
              ) : (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: 'none',
                    margin: '16px 0 0 0',
                    minHeight: '5vh',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', }}>
                    <FaRegTrashAlt />
                    <p style={{ fontStyle: 'italic', fontSize: '16px', margin: 0, padding: 0 }}>&nbsp;- Drop an ingredient here</p>
                  </Box>
                  {columns.deleteCol.itemIds.map((ingredient, i) => <EditableIngredient key={ingredients[ingredient].id} ing={ingredients[ingredient]} index={i}></EditableIngredient>)}
                  {provided.placeholder}
                </div>
              )}
            </>
          )
          }
        </Droppable>
      </DragDropContext>
      <Button variant="text"
        sx={{
          textTransform: 'none',
          fontSize: 16,
          fontStyle: 'italic',
          color: 'primary'
        }}
        onClick={addNewIngredient}>
        <MdLibraryAdd />&nbsp;Add a new ingredient
      </Button>
    </>
  )
}