import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false, 
  currentRecipe: {}, // object that contains the currentRecipes information from db
  easyCookView: false, //show the fullscreen step by step view
  easyCookStep: 0, // last step visited by user. Needs to be cleared upon leaving the main recipe page
  myKitView: true, //true === row, false === tiled
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
    },
    sideNavVisible: (state) => {
      state.sideNavVisible = !state.sideNavVisible;
    }
  }
});

const { actions, reducer } = globalSlice
export const { toggleDarkMode, currentRecipe, easyCookView, easyCookStep, myKitView, sideNavVisible } = actions;

export default reducer;
