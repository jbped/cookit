const mongoose = require("mongoose")
const db = require('../config/connection')

const { Recipe } = require('../models')
const fetch = require("node-fetch")

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

let resultData;
let saveCounter = 0;

const apiCall = (fullUrl) => {
    fetch(fullUrl)
            .then(response => response.json())
            .then(data = () => {
                if (data.meals === null){
                    return;
                }
                console.log("2", data.meals)
        })

        return data
}

db.once('open', async () => {
    // await Recipe.deleteMany({});
    // console.log("delted recipes")
  
    const url = ['https://www.themealdb.com/api/json/v1/1/search.php?f=']
    let letter = '';

    // for (let i = 0; i < alphabet.length; i++){
    //     letter = alphabet[i];
        letter = 'b'

        fullUrl = url + letter
        console.log("1", fullUrl)
        
                const data = apiCall(fullUrl)
                if (data.length === 0){
                    return;
                }
                // for (let j = 0; j < data.meals.length; j++) {

                    let recipe = await Recipe.create({
                        public: true,
                        username: "CooKitChef",
                        recipeTitle: data.meals[0].strMeal,
                        type: data.meals[0].strCategory,
                        season: "Any",
                        difficulty: 1,
                        servings: 2,
                        cookTime: 25
                    })
                    console.log("3", recipe)
                // }

            
        
        // fullUrl.meals.map(
        //     async fullUrl => {
        //     try{
        //         const response = await fetch(fullUrl);
        //         const json = await response.json();
        //         resultData = [...json];
        //         if (resultData.meals === null){
        //             return;
        //         }
        //         console.log(resultData)
        //         for (let i = 0; i < resultData.length; i++) {

        //             // let recipe = new Recipe({

        //             // })
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // )
    // }
    console.log('all done!');
    process.exit(0);
});