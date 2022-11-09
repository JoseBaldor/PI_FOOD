const axios = require('axios');
const {Diet, Recipe} = require('../db.js');
require('dotenv').config();
const {API_KEY} = process.env;

//ME traigo toda la info de la API

const getApiInfo = async() =>{
    const strUrlTemp = 'https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5';
    const strUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=5`;

    const infoApiRecipes = await axios.get(strUrl);

    const apiInfo = await infoApiRecipes.data.results.map(recipe=> {
        const addDiets1 =  recipe.vegan?'vegan':'';
        const addDiets2 =  recipe.vegetarian?'vegetarian':'';
        const addDiets3 =  recipe.glutenFree?'gluten free':'';

        return{
            id: recipe.id,
            title: recipe.title,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            image:recipe.image,
            diets: [... new Set(recipe.diets.concat(addDiets1).concat(addDiets2).concat(addDiets3))].filter(Boolean) ,
            steps: recipe.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
                })
        }
    })

    return apiInfo;
}

const getApiInfoById = async(id) =>{
    const strUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    let apiInfo ={};

    if (id.includes('-')) { //Recetas de la Data Base
        apiInfo = await getDbInfo();
        apiInfo = apiInfo.filter(result => result.id === id);
    } else { //Recetas de la API
        const infoApiRecipes = await axios.get(strUrl);
        const  result  = infoApiRecipes.data;
        const addDiets1 =  result.vegan?'vegan':'';
        const addDiets2 =  result.vegetarian?'vegetarian':'';
        const addDiets3 =  result.glutenFree?'gluten free':'';

        apiInfo = {
            id: result.id,
            title: result.title,
            summary: result.summary,
            healthScore: result.healthScore,
            image: result.image,
            diets: [... new Set(result.diets.concat(addDiets1).concat(addDiets2).concat(addDiets3))].filter(Boolean),
            steps: result.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
                })
    
        };
    }

    return apiInfo;
}


const getDbInfo = async()=>{
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes:[]
            }
        }
    });
};

const getAllRecipes = async() =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    return  [...apiInfo, ...dbInfo];
};

const getApiInfoDiets = async() =>{
    
    const dietsDb = await Diet.findAll();
    
    if(!dietsDb.length){
        const strUrlTemp = 'https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5';
        const strUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`;
    
        const infoApiRecipes = await axios.get(strUrlTemp);
        const  result  = infoApiRecipes.data.results;
        const addDiets =  ['vegan','vegetarian','gluten free', 'ketogenic', 'lacto-vegetarian', 'ovo-vegetarian', 'pescetarian', 'paleo', 'primal', 'low FODMAP', 'whole 30'];

        const dietApi = await result.map((type)=>type.diets).flat();
        const dietApiAll = [...new Set(dietApi.concat(addDiets))].filter(Boolean);

        dietApiAll.forEach(e=> {
            Diet.findOrCreate({ where:{name: e}
            })
        });

        return await Diet.findAll();
    }else{
        return dietsDb;
    }
}

const addRecipe = async (data)=>{
    let {title, summary, healthScore, image, diets, steps, createInDb} = data;

    if(!title || !summary) throw new Error('Datos Incompletos');
    if(healthScore < 0 || healthScore > 100) throw new Error('score debe tener un valor entre 0 - 100');
    healthScore = healthScore ? healthScore : 0
    
    let newRecipe = await Recipe.create({
        title,
        summary,
        healthScore,
        image,
        steps,
        createInDb
    });

    let dietDB = await Diet.findAll({
        where: {name: diets}
    });

    console.log(dietDB);
    await newRecipe.addDiet(dietDB);
    return newRecipe;
}

module.exports = {getApiInfo, getDbInfo, getAllRecipes, getApiInfoById, getApiInfoDiets, addRecipe}