import React, { useState } from 'react'

import { useMutation } from '@apollo/client';
import { UPVOTE_RECIPE, DELETE_UPVOTE_RECIPE } from '../../utils/mutations';

import Auth from '../../utils/auth';

import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function UpvoteHeart({ recipeId, upvotes }) {
    const [upvoteRecipe] = useMutation(UPVOTE_RECIPE);
    const [deleteUpvoteRecipe] = useMutation(DELETE_UPVOTE_RECIPE);
    const { data: { username } } = Auth.getProfile();

    let defaultHeart = upvotes.map(upvote => {
        if (upvotes.username === username) {
            return true;
        }
    })
    const [upvote, setUpvote] = useState(defaultHeart ? true : false);

    const handleUpvote = async () => {
        if (!upvote) {
            try{
                const { data } = await upvoteRecipe({
                    variables: {recipeId}
                });
                setUpvote(true);
            } catch (e) {
                console.error('Upvote Recipe Error: ', e);
            }
        } else {
            try{
                const { data } = await deleteUpvoteRecipe({
                    variables: {recipeId}
                });
                setUpvote(false);
            } catch (e) {
                console.error('Delete Upvote Recipe Error: ', e);
            }
        }
    }
    
    return (
        <IconButton onClick={handleUpvote}>
            {upvote ? 
                <FavoriteIcon></FavoriteIcon>
                : <FavoriteBorderIcon></FavoriteBorderIcon>
            }
        </IconButton>
    )
} 