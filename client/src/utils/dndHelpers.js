// import React, { useState } from 'react'

// // Redux State.... 
// import { useSelector, useDispatch } from 'react-redux';
// import { newRecipe } from './globalSlice';
// ChaNGE
// Logic for when an ingredient was moved
export const newRecipeDragEnd = (props) => {
  // const [result] = useState(props.result)
  // const recipeForm = useSelector(state => state.global.newRecipe)
  // const dispatch = useDispatch();
  
  const { columns } = recipeForm;
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