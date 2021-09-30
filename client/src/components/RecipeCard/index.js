import * as React from 'react';import {
  Link
} from "react-router-dom";

// Queries/Mutations
import { useQuery, useMutation } from '@apollo/client';
import {
    QUERY_ME,
    // QUERY_RECIPES_SHORT
} from '../../utils/queries';

// React Components
import ViewRecipe from "../../pages/ViewRecipe";

// Auth
import Auth from "../../utils/auth";

// React Icons
import { IoMdTimer, IoIosPeople } from "react-icons/io";

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
   // Get QUERY_ME data
   const {userLoading, userData} = useQuery(QUERY_ME);
   console.log("query_me data", userLoading, userData);
   const myData = userData?.me || {}
 
   const token = Auth.loggedIn() ? Auth.getToken() : null;
 
   // Get QUERY_RECIPE data
  // const { loading, recipeData } = useQuery(QUERY_RECIPES_SHORT);
  // console.log("Recipe data", loading, recipeData);
  // const recipes = recipeData?.recipe || {};
  
  // Hardcoded recipes
  const recipe = {
    "_id": "614fe7e963526de392b539b5",
    "isPublic": true,
    "creator": "BoDee_Angus",
    "createdAt": "09/25/2021 at 9:24 PM",
    "recipeTitle": "Fried Eggs",
    "recipeDescription": "Eggs fried in a pan filled with butter, salted and peppered to perfection.",
    "type": "Dinner",
    "season": "All",
    "difficulty": 1,
    "servings": 6,
    "cookTime": "1 hour",
    "directions": [
      {
        "stepId": "step-1",
        "stepText": "First, melt butter on pan at medium heat."
      },
      {
        "stepId": "step-2",
        "stepText": "Then, crack eggs onto pan gently."
      },
      {
        "stepId": "step-3",
        "stepText": "Salt and pepper the eggs, and then wait until the edges solidify completely."
      },
      {
        "stepId": "step-4",
        "stepText": "Flip eggs over, and let sit for a minute or two. After take off heat and serve."
      }
    ],
    "directionsOrder": ["step-1", "step-2", "step-3", "step-4"],
    "ingredients": [
      {
        "ingredientId": "ingredient-1",
        "measurement": null,
        "ingredientName": "Eggs",
        "quantity": "2",
        "preparationNotes": "large"
      },
      {
        "ingredientId": "ingredient-2",
        "measurement": "Tbsp",
        "ingredientName": "Butter",
        "quantity": "2",
        "preparationNotes": "Salted"
      },
      {
        "ingredientId": "ingredient-3",
        "measurement": "c",
        "ingredientName": "Sour Cream",
        "quantity": "1/2",
        "preparationNotes": ""
      }
    ],
    "ingredientsOrder": ["ingredient-1", "ingredient-3", "ingredient-2"],
    "comments": [
      {
        "_id": "614fe7f963526de392b539d0",
        "commentText": "Wow this was delicious!",
        "username": "BoDee_Angus",
        "upvotes": [
          {
            "_id": "614feb27c6da2f76bdc176f2",
            "username": null
          }
        ]
      }
    ],
    "upvotes": [
      {
        "_id": "614feb21c6da2f76bdc176ee",
        "username": "BoDee_Angus"
      }
    ]
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    
    <Router>
      <Switch>
      <Button
                  component={Link}
                  to={`/recipe/:${recipe._id}`}
                  variant="text"
                >
    <Item>
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
      </Item>
      </Button>
    </Switch>
  </Router>
  );
}