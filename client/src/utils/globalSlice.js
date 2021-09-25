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
    ingredients: {
      'test-ing-1': {
        id: 'test-ing-1',
        quantity: '8',
        measurementType: 'Not applicable',
        measurementTypeShort: 'n/a',
        ingredient: 'Eggs',
        notes: 'Large'
      },
      'test-ing-2': {
        id: 'test-ing-2',
        quantity: '7',
        measurementType: 'cup(s)',
        measurementTypeShort: 'c',
        ingredient: 'Milk',
        notes: ''
      },
      'test-ing-3': {
        id: 'test-ing-3',
        quantity: '6',
        measurementType: 'cup(s)',
        measurementTypeShort: 'c',
        ingredient: 'Flour',
        notes: ''
      },
    },
    directions: {
      'test-dir-1': {
        id: 'test-dir-1',
        step: 'Beat all eight eggs in large bowl'
      },
      'test-dir-2': {
        id: 'test-dir-2',
        step: 'Add 2 cups of flour to egg mixture. As the batter gets thicker add 1-2 cups Milk to allow you to continue blending until smooth'
      },
      'test-dir-3': {
        id: 'test-dir-3',
        step: 'Repeat step 2 until all flour and milk has been added to the batter'
      },
    },
    columns: {
      ingredientsCol: {
        id: 'ingredientsCol',
        title: 'Ingredients',
        ingredientIds: ['test-ing-1', 'test-ing-2', 'test-ing-3']
      },
      directionsCol: {
        id: 'directionsCol',
        title: 'Directions',
        directionIds: []
      },
      deleteCol: {
        id: 'deleteCol',
        title: 'Delete',
        deleteIds: []
      }
    },
    columnOrder: ['ingredientsCol']
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
