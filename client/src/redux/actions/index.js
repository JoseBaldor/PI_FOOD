export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_DETAIL = 'GET_RECIPES_DETAIL';
export const CLEAR_RECIPES_DETAIL = 'CLEAR_RECIPES_DETAIL';
export const ERROR = 'ERROR';
export const LOADING = 'LOADING';
export const POST_RECIPE = 'POST_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const GET_RECIPES_BY_TITLE = 'GET_RECIPES_BY_TITLE';
export const ORDER_BY_TITLE = 'ORDER_BY_TITLE';
export const FILTER_BY_DIET = 'FILTER_BY_DIET'
export const FILTER_CREATE ='FILTER_CREATE';
export const FILTER_HEATLH_SCORE = 'FILTER_HEATLH_SCORE'



export const getRecipes =()=>{
        return function(dispatch){
            dispatch({type: LOADING});
                fetch('http://localhost:3001/recipes')
                .then((response)=>response.json())
                .then((data)=>dispatch({type: GET_RECIPES, payload: data}))
                .catch(err=>{
                    dispatch({type: ERROR, payload: err.message});
                    dispatch({type: LOADING, payload: false});
                })
        };
};

export const getRecipesById=(id)=>{
    return function(dispatch){
        dispatch({type: LOADING});
            fetch(`http://localhost:3001/recipes/${id}`)
            .then((response)=>response.json())
            .then((data)=>dispatch({type: GET_RECIPES_DETAIL, payload: data}))
            .catch(err=>{
                dispatch({type: ERROR, payload: err.message}); 
                dispatch({type: LOADING, payload: false});
                alert('Recipe not found');
            })
    };
}

export const getRecipesByTitle=(title)=>{
    return function(dispatch){
        // dispatch({type: LOADING});
            fetch(`http://localhost:3001/recipes/?title=${title}`)
            .then((response)=>response.json())
            .then((data)=>dispatch({type: GET_RECIPES_BY_TITLE, payload: data}))
            .catch(err=>{
                dispatch({type: LOADING, payload: false});
                alert('Recipe not found');
            })
    };
}

export const postRecipe = (input)=>{
    return function(dispatch){
        let options ={
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }

        fetch('http://localhost:3001/recipes/',options)
        .then((response)=>response.json())
        .then((data)=>dispatch({type: POST_RECIPE, payload: data}))
        .catch(err=>{
            dispatch({type: ERROR, payload: err.message});
        })
    } ;   
}

export const getDiets = () =>{
    return function(dispatch){
            fetch('http://localhost:3001/diets/')
            .then((response)=>response.json())
            .then((data)=>dispatch({type: GET_DIETS, payload: data}))
            .catch(err=>{
                dispatch({type: ERROR, payload: err.message});                
            })
    };
}

export const OrderByTitle = (value)=>{
    return function(dispatch){
        dispatch({type: ORDER_BY_TITLE, payload: value});
    }
    
}

export const filterByDiet=(value)=>{
    return function(dispatch){
        dispatch({type: FILTER_BY_DIET, payload: value})
    }
};

export const filterCreated=(value)=>{
    return function(dispatch){
        dispatch({type: FILTER_CREATE, payload: value});
    };
}

export const filterHealthScore=(value)=>{
    return function(dispatch){
        dispatch({type: FILTER_HEATLH_SCORE, payload: value});
    }
}

export const setLoading = (value) => {
    return function(dispatch){
        dispatch({type: LOADING, payload: value});
    };
  };
