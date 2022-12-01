
const checkDataPost = (req, res, next) =>{
    let {title, summary, healthScore } = req.body;

    if(!title) 
    return res.status(400). send('Falta el titulo de la receta')
    if(!summary) 
    return res.status(400). send('Falta el resumen de la receta')    
    if(healthScore < 0 || healthScore > 100) 
    return res.status(400). send('El score debe tener un valor entre 0 - 100')    

    next();
};

module.exports = checkDataPost;