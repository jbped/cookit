import React from 'react'
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { DELETE_RECIPE } from '../../../utils/mutations';

import { useDispatch, useSelector } from 'react-redux';
import { toggleDeleteDialog } from '../../../utils/globalSlice'

export default function DeleteDialog() {
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const open = useSelector(state => state.global.editRecipe.deleteDialog);
  // const forked = useSelector(state => state.global.editRecipe.forked);
  const dispatch = useDispatch();
  // const history = useHistory()

  const handleClose = (e) => {
    const option = e.target.innerText
    option === "Delete" && handleDeleteRecipe()
    dispatch(toggleDeleteDialog())
  };

  const params = useParams();

  const recipeId = params.id

  const handleDeleteRecipe = async () => {
    try{
      await deleteRecipe({
        variables: {id: recipeId}
      });
      window.location.assign('/my-kit');
    } catch(e) {
      console.error('Delete Recipe Error: ', e);
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="secondary">
          {"Delete your recipe?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" color="light.main">
            Please confirm that you wish to delete this recipe? Note, this action can not be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}