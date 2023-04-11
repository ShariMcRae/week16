import { 
  getRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord
 } from "./api";

// Provides CRUD methods for accessing 
// recipes located at MockApi.com.

const RECIPES_ENDPOINT =
  "https://642e25ec2b883abc6407dd04.mockapi.io/api/v1/recipes";

export async function getRecipes(query, sortBy, sortOrder) {
  return await getRecords(query, RECIPES_ENDPOINT, sortBy, sortOrder);
}

export async function createRecipe(recipe) {
  return createRecord(RECIPES_ENDPOINT, recipe);
}

export async function getRecipe(id) {
  return getRecord(RECIPES_ENDPOINT, id);
}

export async function updateRecipe(id, updatedRecipe) {
  return updateRecord(RECIPES_ENDPOINT, id, updatedRecipe)
}

export async function deleteRecipe(id) {
  return deleteRecord(RECIPES_ENDPOINT, id);
}
