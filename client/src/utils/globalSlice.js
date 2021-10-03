import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  darkMode: false, 
  newRecipe: {
    recipeTitle: 'New Recipe',
    type: [],
    cookTime: '',
    servings: 1,
    isPublic: 'private',
    recipeDescription: '',
    ingredients: {},
    directions: {},
    columns: {
      ingredientsCol: {
        id: 'ingredientsCol',
        title: 'Ingredients',
        itemIds: [] // ingredientsOrder in DB
      },
      directionsCol: {
        id: 'directionsCol',
        title: 'Directions',
        itemIds: [] //directionsOrder in DB
      },
      deleteIngCol: {
        id: 'deleteIngCol',
        title: 'Delete',
        itemIds: [],
        deletedIds: []
      },
      deleteDirCol: {
        id: 'deleteDirCol',
        title: 'Delete',
        itemIds: [],
        deletedIds: []
      }
    },
    ingredientErrors: [],
    directionErrors: [],
    formCleared: false,
  },
  editRecipe: {},
  currentRecipe: {}, // object that contains the currentRecipes information from db
  easyCookView: false, //show the fullscreen step by step view USE MUI MOBILE STEPPER FOR DISPLAY
  easyCookStep: 0, // last step visited by user. Needs to be cleared upon leaving the main recipe page
  myKitView: true, //true === row, false === tiled
  discoverView: true, //true === row, false === tiled
  sideNavVisible: false, // true === sideNav appears
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
    editThisRecipe: (state, action) => {
      Object.keys(action.payload)
        .forEach(function eachKey(key) {
          state.editRecipe[key] = action.payload[key]
        })
      // state.editRecipe = action.payload
    },
    createEditRecipe: (state, action) => {
      state.editRecipe = action.payload;
    },
    currentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
    toggleEasyCookView: (state) => {
      state.easyCookView = !state.easyCookView;
    },
    setEasyCookStep: (state, action) => {
      state.easyCookStep = action.payload
    },
    toggleMyKitView: (state) => {
      state.myKitView = !state.myKitView;
    },
    toggleDiscoverView: (state) => {
      state.discoverView = !state.discoverView;
    },
    sideNavVisible: (state) => {
      state.sideNavVisible = !state.sideNavVisible;
    }
  }
});

const { actions, reducer } = globalSlice

export const { 
  toggleDarkMode, 
  newRecipe,
  editThisRecipe,
  createEditRecipe,
  currentRecipe, 
  toggleEasyCookView, 
  setEasyCookStep, 
  toggleMyKitView,
  toggleDiscoverView,
  sideNavVisible } = actions;

export default reducer;
