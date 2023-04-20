import { 
  getRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord
 } from "./api";
 import { getRecipeType, getRecipeTypes } from "./recipeTypes";

// Provides CRUD methods for accessing 
// recipes located at MockApi.com.

const RECIPES_ENDPOINT =
  "https://642e25ec2b883abc6407dd04.mockapi.io/api/v1/recipes";

export async function getRecipes(query, sortBy, sortOrder) {
console.log("getRecipes");
  let recipes = await getRecords("search", query, RECIPES_ENDPOINT, sortBy, sortOrder);
  const recipeTypes = await getRecipeTypes("", "id", "asc");
  let temp = recipes.map((recipe) => {
console.log("recipe.recipeTypeId", recipe.recipeTypeId);
    const recipeType = recipeTypes.filter(recipeType => recipeType.id === recipe.recipeTypeId);
console.log("recipeType", recipeType);
    return {...recipe, recipeType: recipeType.length?recipeType[0].typeName:""};
  });
console.log("getRecipes returning ", temp);  
  return temp;
}

export async function createRecipe() {
  let recipe = {
    description: "",
    instructions: "",
    ingredients: [],
    imageURL: "",
    recipeTypeId: "",
    favorite: false,
  };
  return createRecord(RECIPES_ENDPOINT, recipe);
}

export async function getRecipe(id) {
  const recipe = await getRecord(RECIPES_ENDPOINT, id);

  console.log("recipe", recipe);
  if (!recipe) throw new Error("Recipe with id " + id + " does not exist.");
  //else return {id: "0", name: ""};


  const recipeType = await getRecipeType(recipe.recipeTypeId);
console.log("getRecipe, recipe", recipe);
console.log("getRecipe, recipeType", recipeType);
  recipe.recipeType = recipeType.name;
  return recipe;
}

export async function updateRecipe(id, updatedRecipe) { 
  return updateRecord(RECIPES_ENDPOINT, id, updatedRecipe)
}

export async function deleteRecipe(id) {
  return deleteRecord(RECIPES_ENDPOINT, id);
}
