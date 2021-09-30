import * as React from 'react';
import { Link } from 'react-router-dom';

// React Icons
import { IoMdTimer, IoIosPeople } from 'react-icons/io';
import {
  BsPeople
} from "react-icons/bs";

// Import Material UI components
import { styled } from '@mui/material/styles';


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Loader from '../Loader'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export default function RecipeReviewCard({recipe}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  

  return (
    <Item>
      <Card sx={{ maxWidth: 345 }}>
        <Button
          component={Link}
          to={`/recipe/${recipe._id}`}
          // variant="text"
          // color="text.secondary"
        >
          <CardHeader
            sx={{
              color: 'white',
            }}
            action={<IconButton aria-label='settings'></IconButton>}
            title={recipe.recipeTitle}
            subheader={`added: ${recipe.createdAt} by ${recipe.creator}`}
          />
        </Button>
        <CardContent>
          <Typography
            sx={{
              marginBottom: '.5rem',
            }}
            variant='body2'
            color='text.white'
          >
            {recipe.recipeDescription}
          </Typography>
          <Typography>
            <IoMdTimer /> Cook Time:
          </Typography>
          <Typography>{recipe.cookTime}</Typography>
          <Typography>
            <IoIosPeople /> Serves: {`${recipe.servings}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>Ingredients:</Typography>
            {recipe.ingredients.map((ingredient) => (
              <Typography
                paragraph
                key={ingredient.ingredientName}
                value={ingredient.ingredientName}
              >
                {`${ingredient.ingredientName}`}
                {/* Eggs */}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </Item>
  );
}
