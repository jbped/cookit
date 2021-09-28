// Convert ingredients array to an object organized by the ingredientsOrder
  ingredientsOrder.forEach(id => {
    ingredients.filter(ingredient => {
      if (ingredient.ingredientId === id) {
        ingredientsObject[ingredient.ingredientId] = {...ingredient}
        return ingredientsObject;
      }
      return ingredientsObject;
    })
  });
  console.log('ingredientsObject', ingredientsObject)

    // Convert directions array to an object organized by the directionsOrder
    const directionsObject = {}
    directionsOrder.forEach(id => {
      directions.filter(direction => {
        if (direction.stepId === id) {
          directionsObject[direction.stepId] = {...direction}
          return directionsObject;
        }
        return directionsObject;
      })
    });