const {Router} = require('express');
const {getApiInfoDiets} = require('../controllers/allinfo.js');

const router = Router();


router.get('/', async(req, res)=>{
    try {
        const allDiets = await getApiInfoDiets();
        res.status(201).send(allDiets);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;