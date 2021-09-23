const mongoose = require("mongoose")
const db = require('../config/connection')

const { Recipe } = require('../models')
const { addRecipe } = require('../schemas/resolvers')
const fetch = require("node-fetch")

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

let resultData;
let saveCounter = 0;


db.once('open', async () => {
    // await Recipe.deleteMany({});
    // console.log("deleted recipes")
  
    const url = ['https://www.themealdb.com/api/json/v1/1/search.php?f=']
    let letter = '';

    // for (let i = 0; i < alphabet.length; i++){
    //     letter = alphabet[i];
        letter = 'a'

        fullUrl = url + letter
        console.log("1", fullUrl)
        
        const data = await fetch(fullUrl)
            .then(data => data.json())
            
                // console.log(data)
                
            
                if (data.length === 0){
                    return;
                }
                console.log(data)
                for (let j = 0; j < data.meals.length; j++) {

                    let recipe = {
                        public: true,
                        username: "CooKitChef",
                        recipeTitle: data.meals[j].strMeal,
                        type: data.meals[j].strCategory,
                        season: "Any",
                        difficulty: 1,
                        servings: 2,
                        cookTime: 25
                    }
                    addRecipe(recipe)
                    console.log("3", recipe)
                    recipe.save(() => {
                        console.log("saved" + recipe)
                        
                        saveCounter++;
                    
                        
                    })
                }

        
        
    // }
    console.log(saveCounter)
    console.log('all done!');
    process.exit(0);
});