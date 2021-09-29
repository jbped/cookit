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
  Typography,
} from '@mui/material';

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
  padding-top: ${props => (props.isDraggingOver || props.hasItem.length > 0) && '16px'};
  padding-left:  ${props => (props.isDraggingOver || props.hasItem.length > 0) && '16px'}; 
  padding-right:  ${props => (props.isDraggingOver || props.hasItem.length > 0) && '16px'}; 
  min-height: 5vh;
  border-radius: 4px;
  text-align: center;
  background-color: ${props => (props.isDraggingOver || props.hasItem.length > 0) ? '#ef5350' : 'inherit'};
  color: ${props => (props.isDraggingOver || props.hasItem.length > 0) ? '#000000' : 'inherit'};

`;


export default function IngredientsSection() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();
  const [newIngredient, setNewIngredient] = useState(1);

  const { columns, ingredients } = recipeForm;
  const { ingredientsCol, deleteIngCol, deleteIngCol: { deletedIds }, ingredientsCol: { itemIds } } = columns;

  // console.log(columns)

  // Used for troubleshooting drag behavior
  // const onDragUpdate = update => {
  //   console.log(update)
  // }

  // // Need to turn this into a hook to function going non-DRY for now
  // const onDragEnd = result => {
  //   newRecipeDragEnd(result) 
  // }

  // Logic for when an ingredient was moved
  const onDragEnd = result => {
    // console.log(result)
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
      // console.log('newItemIds', newItemIds)

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
      // console.log(recipeForm.columns)
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
  };

  // Handler for cancelling delete for selected items (returns them to the ingredients column)
  const cancelDelete = () => {
    const deleteIds = Array.from(deleteIngCol.itemIds);
    const ingredientIds = Array.from(ingredientsCol.itemIds);

    // merge delete ids with ingredient ids
    const newIngredientIds = ingredientIds.concat(deleteIds);
    console.log(newIngredientIds);

    // new state for returning to-be-deleted items to ingredients column, and clearing deleteIngCol itemIds
    const newState = {
      columns: {
        ...columns,
        ingredientsCol: {
          ...ingredientsCol, 
          itemIds: newIngredientIds
        },
        deleteIngCol: {
          ...deleteIngCol,
          itemIds: []
        }
      }
    }

    // update global state
    dispatch(newRecipe(newState))
  };

  // Delete ingredients in the Delete Column
  const handleDelete = async () => {
    const deleteIds = Array.from(deleteIngCol.itemIds);
    let editedIngredients = {...ingredients};

    // merge delete itemIds with deletedIds
    const newDeletedIds = deletedIds.concat(deleteIds);
    console.log(newDeletedIds);

    // Remove selected ingredients from the ingredients object
    await deleteIds.forEach(item => {
      delete editedIngredients[item]
    });

    // State to be passed to clear deleteIngCol itemsIds array
    const newColState = {
      columns: {
        ...columns,
        deleteIngCol: {
          ...deleteIngCol, 
          itemIds:[],
          deletedIds: newDeletedIds,
        }
      }
    }

    // State to be passed to remove selected ingredients from ingredients object
    // const newIngState = {
    //   ingredients: {
    //     editedIngredients
    //   }
    // }
    
    // Push to globalState
    await dispatch(newRecipe(newColState));
    console.log('newColState', columns);

    // await dispatch(newRecipe(newIngState)); FOR SOME REASON ENABLING THIS BREAKS SORTING?!?!?!?!
    // console.log('newIngState', ingredients);
  }

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
          ingredientId: ingredientId,
          quantity: '',
          measurementType: '',
          measurementTypeShort: '',
          ingredient: '',
          notes: '',
          errors: {
            quantity: false,
            ingredient: false
          }
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
    // console.log(recipeForm)
  };

  return (
    <>
      <Box sx={{
        mt: 3, 
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h5" color="primary">Ingredients</Typography>
      </Box>
      <DragDropContext
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId={ingredientsCol.id}>
          {(provided) => (
            <Box component="div"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {itemIds.map((ingredient, i) => <EditableIngredient key={ingredients[ingredient].ingredientId} ing={ingredients[ingredient]} index={i}></EditableIngredient>)}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        <Droppable droppableId={deleteIngCol.id}>
          {(provided, snapshot) => (
            <>
              {(ingredientsCol.itemIds.length > 0 || deleteIngCol.itemIds.length > 0) ? (
                <DeleteDiv
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  hasItem={deleteIngCol.itemIds}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', }}>
                    <FaRegTrashAlt />
                    <Typography style={{ fontStyle: 'italic', fontSize: '16px', margin: 0, padding: 0 }}>
                      &nbsp;
                      {deleteIngCol.itemIds.length === 0 ? 
                      'Drop an ingredient here' 
                      : 
                      'Items selected to delete'}
                    </Typography>
                  </Box>

                  {columns.deleteIngCol.itemIds.map((ingredient, i) => <EditableIngredient key={ingredients[ingredient].ingredientId} ing={ingredients[ingredient]} index={i}></EditableIngredient>)}
                  {provided.placeholder}

                  {deleteIngCol.itemIds.length > 0 && (
                    <Box sx={{
                      display: 'flex', 
                      flexWrap: 'nowrap', 
                      alignItems: 'center', 
                      p: 2, 
                      borderRadius: '0 0 4', 
                      justifyContent: 'end'
                    }}>
                      <Button variant="text" color="secondary" size="small" sx={{marginRight: 2}} onClick={cancelDelete}>Cancel</Button>
                      <Button size="small" variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                    </Box>
                  )}
                </DeleteDiv>
              ) : (
                <Box component="div"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: 'none',
                    // margin: '16px 0 0 0',
                    // minHeight: '5vh',
                    // borderRadius: '4px',
                    // textAlign: 'center',
                  }}
                >
                  {/* {columns.deleteIngCol.itemIds.map((ingredient, i) => <EditableIngredient key={ingredients[ingredient].id} ing={ingredients[ingredient]} index={i}></EditableIngredient>)} */}
                  {provided.placeholder}
                </Box>
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