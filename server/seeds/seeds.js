// const mongoose = require("mongoose")
// const db = require('../config/connection')

// const { Recipe } = require('../models')
const fetch = require("node-fetch")

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

let resultData;
let saveCounter = 0;

// mongoose.connect(db)
// .then(() => console.log("mongodb connection success"))
// .catch(error => console.log(error))

const url = ['https://www.themealdb.com/api/json/v1/1/search.php?f=']
let letter = '';

// for (let i = 0; i < alphabet.length; i++){
//     letter = alphabet[i];
    letter = 'a'

    fullUrl = url + letter

    fetch(fullUrl)
        .then(response => response.json())
        .then(data => console.log(data))
    
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