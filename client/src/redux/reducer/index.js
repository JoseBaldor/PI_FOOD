import {GET_RECIPES, GET_RECIPES_DETAIL, CLEAR_RECIPES_DETAIL, 
    GET_DIETS, POST_RECIPE, GET_RECIPES_BY_TITLE, ORDER_BY_TITLE, 
    ERROR, LOADING, FILTER_BY_DIET, 
    FILTER_CREATE, FILTER_HEATLH_SCORE} from '../actions';

const initialState={
    recipes: [],
    filterRecipes: [],
    recipeDetail: [],
    diets:[],
    loading: false,
    source: 'All',
    diet: 'All',
    error: '',
};

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_RECIPES:
            return({
                ...state,
                recipes: action.payload,
                filterRecipes: action.payload,
                loading: false,
            });
        case GET_RECIPES_DETAIL:
            return({
                ...state,
                recipeDetail: action.payload,
                loading: false,
            });
        case GET_RECIPES_BY_TITLE:
            return({
                ...state,
                filterRecipes: action.payload,
                loading: false,
            })
        case CLEAR_RECIPES_DETAIL:
            return({
                ...state,
                recipeDetail: initialState.recipeDetail
            });
        case GET_DIETS:
            return({
                ...state,
                diets: action.payload
            });
        case POST_RECIPE:
            return({
                ...state,
                recipes: [...state.recipes, action.payload]
            });
        case ORDER_BY_TITLE:
            let orderTitle = action.payload === 'asc'?
            state.filterRecipes.sort(function(a,b){
                if(a.title > b.title)return 1
                if(b.title > a.title)return -1
                return 0;
            }):
            state.filterRecipes.sort(function(a,b){
                if(a.title > b.title)return -1
                if(b.title > a.title)return 1
                return 0;
            });
            return{
                ...state,
                filterRecipes: [...orderTitle]
            }
        case FILTER_BY_DIET:
            let filterBySource = [];

            if(state.source === 'Created'){
                filterBySource = state.recipes.filter(res => isNaN(res.id));
            }else if(state.source === 'Api'){
                filterBySource = state.recipes.filter(res => typeof(res.id)==='number');
            }else{
                filterBySource = state.recipes;
            }

            const filterDiet = action.payload === 'All' && filterBySource.length 
            ? filterBySource 
            : filterBySource.filter((element)=>element.diets.includes(action.payload))

                return({
                ...state,
                filterRecipes: [...filterDiet],
                diet: action.payload
            });
        case FILTER_CREATE:
            let filterCreated = [];

            const filtereByDiet = state.diet === 'All'
            ? state.recipes
            : state.recipes.filter(res => res.diets.includes(state.diet));


            switch(action.payload){
                case 'All':
                    filterCreated = filtereByDiet;
                    break;
                case 'Api':
                    filterCreated = filtereByDiet.filter((recipe)=>!recipe.createInDb);
                    break;
                case 'Created':
                    filterCreated = filtereByDiet.filter((recipe)=>recipe.createInDb);
                break;
            }
            return({
                ...state,
                filterRecipes: [...filterCreated],
                source: action.payload
            });
        case FILTER_HEATLH_SCORE:
            let orderHealth = action.payload === 'asc'?
            state.filterRecipes.sort(function(a,b){
                if(a.healthScore > b.healthScore)return 1
                if(b.healthScore > a.healthScore)return -1
                else return 0;
            }):
            state.filterRecipes.sort(function(a,b){
                if(a.healthScore > b.healthScore)return -1
                if(b.healthScore > a.healthScore)return 1
                else return 0;
            });
            return{
                ...state,
                filterRecipes: [...orderHealth]
            }
        case ERROR:
            return({
                ...state,
                error: action.payload
            });
        case LOADING:
            return({
                ...state,
                loading: true
            });
        default:
            return({
                ...state
            });
    };
};

export default rootReducer;