import reducer, {
  initialState, 
  toggleDarkMode,
  newRecipe,
  currentRecipe,
  easyCookView,
  easyCookStep,
  myKitView 
} from  '../utils/globalSlice'

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
});

test('darkMode should be toggled', () => {
  const previousState = { darkMode: false }
  expect(reducer(previousState, toggleDarkMode())).toEqual({ darkMode: true })
})

test('newRecipe should be added', () => {
  const previousState = {
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
    }
  }
  expect(reducer(previousState, newRecipe({
    recipeName: "Swedish Pancakes", 
    ingredients: { 
      'test-ing-1': {  
        id: 'test-ing-1',
        quantity: '7',
        measurementType: 'cup(s)',
        measurementTypeShort: 'c',
        ingredient: 'Milk',
        notes: ''
      },
    }
  }))).toEqual({
    newRecipe: {
      recipeName: 'Swedish Pancakes',
      type: [],
      time: '',
      partySize: 1,
      public: 'private',
      description: '',
      ingredients: { 
        'test-ing-1': {  
          id: 'test-ing-1',
          quantity: '7',
          measurementType: 'cup(s)',
          measurementTypeShort: 'c',
          ingredient: 'Milk',
          notes: ''
        },
      },
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
    }
  })
});

test('easyCookView should be toggled', () => {
  const previousState = { easyCookView: false }
  expect(reducer(previousState, easyCookView())).toEqual({ easyCookView: true })
})

test('easyCookStep should be changed from 0 to 1', () => {
  const previousState = { easyCookStep: 0 }
  expect(reducer(previousState, easyCookStep(1))).toEqual({ easyCookStep: 1 })
})

test('myKitView should be toggled', () => {
  const previousState = { myKitView: false }
  expect(reducer(previousState, myKitView())).toEqual({ myKitView: true })
})