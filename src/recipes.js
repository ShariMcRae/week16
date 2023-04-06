import { recipesApi } from './rest/RecipesApi.js';

export async function getRecipes(query) {
  await fakeNetwork(`getRecipes:${query}`);
  let recipes = await recipesApi.getRecipes(query);
  if (!recipes) recipes = [];
  return recipes; 
}

export async function createRecipe() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
console.log("createRecipe in recipes.js sending in id: " + id);  
    let recipe =  {
        "desc": "",
        "instructions": "",
        "ingredients": [],
        "imageURL": "",
        "favorite": false
    } ;
  await recipesApi.createRecipe(recipe);

  return getRecipes("");
}

export async function getRecipe(id) {
  await fakeNetwork(`recipe:${id}`);
  let recipe = recipesApi.getRecipe(id);
  return recipe ?? null;
}

export async function updateRecipe(id, updates) {
  await fakeNetwork();
console.log("recipes, updateRecipe, updates = ", updates);  
  return recipesApi.updateRecipe(id, updates);
}

// export async function deleteRecipe(id) {
//   let contacts = await localforage.getItem("contacts");
//   let index = contacts.findIndex(contact => contact.id === id);
//   if (index > -1) {
//     contacts.splice(index, 1);
//     await set(contacts);
//     return true;
//   }
//   return false;
// }

// function set(contacts) {
//   return localforage.setItem("contacts", contacts);
// }

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