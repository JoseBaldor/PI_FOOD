
export const validate =(input)=> {
    const errors = {};
    if (!input.title) {
      errors.title = "Please complete with a recipe title";
    }else if (!input.title.match(/^[A-Za-z\s]+$/)){
      errors.title = "Write only letters, please"
    }else if(input.title.length < 8){
      errors.title = "The name must contain at least 8 characters"
    }else if(input.title.length > 100){
      errors.title = "The name is too long"
    };
    
    if (!input.summary)
      errors.summary = "Please add some comments about your recipe";
    
    if (!input.diets.length)
      errors.diets = "You must select at least one diet type";
    
    if (input.healthScore < 1 || input.healthScore > 100)
      errors.healthScore = "The score must be a number between 1 and 100";
    
    if (!input.steps.length)
      errors.steps = "Please detail the steps for your recipe";
    return errors;
  }

