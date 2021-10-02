import React from 'react'

import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function UpvoteHeart() {
    let upvoted = false;
    const handleHeartClick = () => {
        upvoted = !upvoted;
        console.log(upvoted);
    }
    
    return (
        <IconButton onClick={handleHeartClick}>
            {upvoted ? 
                <FavoriteIcon></FavoriteIcon>
                : <FavoriteBorderIcon></FavoriteBorderIcon>
            }
        </IconButton>
    )
} 