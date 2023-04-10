import { recipesApi } from './rest/RecipesApi.js';

export async function getRecipes(query) {
  await fakeNetwork(`getRecipes:${query}`);
  let recipes = await recipesApi.getRecipes(query);
  if (!recipes) recipes = [];
  return recipes; 
}

export async function createRecipe() {
  await fakeNetwork();
  let recipe =  {
    desc: "",
    instructions: "",
    ingredients: [],
    imageURL: "",
    favorite: false
  };
  return await recipesApi.createRecipe(recipe);
}

export async function getRecipe(id) {
  await fakeNetwork(`recipe:${id}`);
  return recipesApi.getRecipe(id); 
}

export async function updateRecipe(id, updates) {
  await fakeNetwork(); 
  return recipesApi.updateRecipe(id, updates);
}

export async function deleteRecipe(id) {
  return recipesApi.deleteRecipe(id);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}