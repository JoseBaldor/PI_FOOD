const {Router} = require('express');
const router = Router();
const {getAllRecipes, getApiInfoById, addRecipe, deleteRecipe} = require('../controllers/allinfo.js');
const checkDataPost = require('../middlewares/validateData.js');
// const { Diet, Recipe } = require('../db');


router.get('/', async(req,res)=>{
    const {title} = req.query;
    let infoRecipes
    try {
        infoRecipes  = await getAllRecipes();
        if (title){
            infoRecipes =  infoRecipes.filter(recipe => recipe.title.toLowerCase().includes(title.toLowerCase()));
            if(infoRecipes.length){
                res.status(200).send(infoRecipes);
            }else{
                res.status(400).send("Sorry, Recipe name not found");    
            }
        }else{
            res.status(200).send(infoRecipes);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/:idRecipe', async(req,res)=>{
    const { idRecipe } = req.params;
    try {
        const infoById = await getApiInfoById(idRecipe);
        res.status(201).send(infoById);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/', checkDataPost, async(req,res)=>{
    try {
        res.status(201).send(await addRecipe(req.body));
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/:idRecipe', async(req,res)=>{
    const {idRecipe } = req.params;
    try {
        res.status(201).send(await deleteRecipe(idRecipe));
    } catch (error) {
        res.status(400).send(error.message);
    }
})
    
module.exports = router;