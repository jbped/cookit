<<<<<<< HEAD
import * as React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_RECIPE_BASIC } from '../../utils/queries'
=======
import * as React from 'react';import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Queries/Mutations
import { useQuery, useMutation } from '@apollo/client';
import {
    QUERY_ME,
    QUERY_RECIPES_SHORT
} from '../../utils/queries';

// React Components
import ViewRecipe from "../../pages/ViewRecipe";

// Auth
import Auth from "../../utils/auth";

// React Icons
import { IoMdTimer, IoIosPeople } from "react-icons/io";
>>>>>>> 18347d637d44a1d863f0ee290cb4ddb2c6362771

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

export default function RecipeReviewCard() {
<<<<<<< HEAD
  // const {loading, userData} = useQuery()

  // const {data} = useQuery(QUERY_RECIPE_BASIC)
  // console.log("Recipe review card", data)

=======
   // Get QUERY_ME data
   const {userLoading, userData} = useQuery(QUERY_ME);
   console.log("query_me data", userLoading, userData);
   const myData = userData?.me || {}
 
   const token = Auth.loggedIn() ? Auth.getToken() : null;
 
   // Get QUERY_RECIPE data
  const { loading, recipeData } = useQuery(QUERY_RECIPES_SHORT);
  console.log("Recipe data", loading, recipeData);
  const recipes = recipeData?.recipe || {};
  
>>>>>>> 18347d637d44a1d863f0ee290cb4ddb2c6362771
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Item>
    {recipes.map((recipe) => (
      <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
            <IconButton
              aria-label="settings"
            >
          </IconButton>
        }
        title="Title"
        subheader={`added: ${recipe.createdAt} by ${recipe.creator}`}
      />
      <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
          >
          {recipe.recipeDescription}
          </Typography>
          <Typography>
            
            <IoMdTimer/> Cook Time:
          </Typography>
          <Typography>
            {recipe.cookTime}
          </Typography>
          <Typography>
            <IoIosPeople />  Serves: {`${recipe.servings}`}
          </Typography>
      </CardContent>
        <CardActions
          disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
            <CardContent>
            <Typography
              paragraph
            >
              Ingredients:
            </Typography>
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
        ))}
    </Item>
  );
}