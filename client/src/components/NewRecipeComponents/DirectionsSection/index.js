import React, { useState } from 'react'
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
import EditableStep from '../EditableStep';
const DeleteDiv = styled.div`
  margin: 16px 0 0 0;
  padding-top: ${props => (props.isDraggingOver || props.hasItem.length > 0) && '16px'};
  min-height: 5vh;
  border-radius: 4px;
  text-align: center;
  background-color: ${props => (props.isDraggingOver || props.hasItem.length > 0) ? '#ef5350' : 'inherit'};
`;

export default function DirectionsSection() {
  const recipeForm = useSelector(state => state.global.newRecipe)
  const dispatch = useDispatch();
  const [newStep, setNewStep] = useState(1);

  const { columns, directions } = recipeForm
  const { directionsCol, deleteDirCol, deleteDirCol: { deletedIds }, directionsCol: { itemIds } } = columns;

  // Logic for when an ingredient was moved
  const onDragEnd = result => {
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
    const deleteIds = Array.from(deleteDirCol.itemIds);
    const stepIds = Array.from(directionsCol.itemIds);

    // merge delete ids with ingredient ids
    const newStepIds = stepIds.concat(deleteIds);
    console.log(newStepIds);

    // new state for returning to-be-deleted items to ingredients column, and clearing deleteIngCol itemIds
    const newState = {
      columns: {
        ...columns,
        directionsCol: {
          ...directionsCol, 
          itemIds: newStepIds
        },
        deleteDirCol: {
          ...deleteDirCol,
          itemIds: []
        }
      }
    }

    // update global state
    dispatch(newRecipe(newState))
  };

  // Delete ingredients in the Delete Column
  const handleDelete = async () => {
    const deleteIds = Array.from(deleteDirCol.itemIds);
    let editedSteps = {...directions};

    // merge delete itemIds with deletedIds
    const newDeletedIds = deletedIds.concat(deleteIds);
    console.log(newDeletedIds);

    // Remove selected ingredients from the ingredients object
    await deleteIds.forEach(item => {
      delete editedSteps[item]
    });

    // State to be passed to clear deleteIngCol itemsIds array
    const newColState = {
      columns: {
        ...columns,
        deleteDirCol: {
          ...deleteDirCol, 
          itemIds:[],
          deletedIds: newDeletedIds,
        }
      }
    }

    // State to be passed to remove selected ingredients from ingredients object
    // const newDirState = {
    //   directions: {
    //     editedSteps
    //   }
    // }
    
    // Push to globalState
    await dispatch(newRecipe(newColState));
    console.log('newColState', columns);

    // await dispatch(newRecipe(newDirState)); FOR SOME REASON ENABLING THIS BREAKS SORTING?!?!?!?!
    // console.log('newDirState', ingredients);
  }

  const addNewStep = () => {
    // create ingredient id and increment newIngredient INT
    const stepId = `step-${newStep}`;
    setNewStep(newStep + 1);

    // update newRecipe in global state with the ingredient in the ingredients obj and 
    const newStepIdArr = [...itemIds, stepId]
    dispatch(newRecipe({
      directions: {
        ...directions,
        [stepId]: {
          id: stepId,
          stepText: ''
        }
      },
      columns: {
        ...columns,
        directionsCol: {
          ...directionsCol,
          itemIds: newStepIdArr
        }
      }
    }))
    // console.log(recipeForm)
  };
  return (
    <>
      <Box sx={{
        borderBottom: 1,
        borderColor: 'grey.300'
      }}>
        <h2>Directions</h2>
      </Box>
      <DragDropContext
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId={directionsCol.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {itemIds.map((step, i) => <EditableStep key={directions[step].id} step={directions[step]} index={i}></EditableStep>)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId={deleteDirCol.id}>
          {(provided, snapshot) => (
            <>
              {(directionsCol.itemIds.length > 0 || deleteDirCol.itemIds.length > 0) ? (
                <DeleteDiv
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  hasItem={deleteDirCol.itemIds}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', }}>
                    <FaRegTrashAlt />
                    <p style={{ fontStyle: 'italic', fontSize: '16px', margin: 0, padding: 0 }}>{deleteDirCol.itemIds.length === 0 ? ' - Drop a step here' : ' - Steps selected to delete'}</p>
                  </Box>

                  {deleteDirCol.itemIds.map((step, i) => <EditableStep key={directions[step].id} step={directions[step]} index={i}></EditableStep>)}
                  {provided.placeholder}

                  {deleteDirCol.itemIds.length > 0 && (
                    <Box sx={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: '0 0 4',
                      justifyContent: 'end'
                    }}>
                      <Button variant="outlined" size="small" sx={{ marginRight: 2 }} onClick={cancelDelete}>Cancel</Button>
                      <Button size="small" variant="contained" onClick={handleDelete}>Delete</Button>
                    </Box>
                  )}
                </DeleteDiv>
              ) : (
                <div
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
          fontStyle: 'italic'
        }}
        onClick={addNewStep}
      >
        <MdLibraryAdd />&nbsp;Add a new step
      </Button>
    </>
  )
}