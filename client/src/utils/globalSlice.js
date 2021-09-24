import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  darkMode: false, 
  newRecipe: {
    recipeName: 'New Recipe',
    type: [],
    time: '',
    partySize: 1,
    public: 'private',
    description: '',
    ingredients: {},
    directions: {},
    columns: {
      'ingredientsCol': {
        id: 'ingredients-column',
        title: 'Ingredients',
        ingredientIds: []
      },
      'directionsCol': {
        id: 'directions-column',
        title: 'Directions',
        directionIds: []
      }
    }
  },
  currentRecipe: {}, // object that contains the currentRecipes information from db
  easyCookView: false, //show the fullscreen step by step view
  easyCookStep: 0, // last step visited by user. Needs to be cleared upon leaving the main recipe page
  myKitView: true, //true === row, false === tiled
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    newRecipe: (state, action) => {
      Object.keys(action.payload)
        .forEach(function eachKey(key) {
          state.newRecipe[key] = action.payload[key]
        })
      // state.newRecipe = action.payload
    },
    currentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
    easyCookView: (state) => {
      state.easyCookView = !state.easyCookView;
    },
    easyCookStep: (state, action) => {
      state.easyCookStep = action.payload
    },
    myKitView: (state) => {
      state.myKitView = !state.myKitView;
    }
  }
});

const { actions, reducer } = globalSlice
export const { 
  toggleDarkMode, 
  newRecipe, 
  currentRecipe, 
  easyCookView, 
  easyCookStep, 
  myKitView } = actions;

export default reducer;
