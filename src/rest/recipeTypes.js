import { 
  getRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord
 } from "./api";

// Provides CRUD methods for accessing 
// recipeTypes located at MockApi.com.

const RECIPE_TYPES_ENDPOINT =
  "https://642e25ec2b883abc6407dd04.mockapi.io/api/v1/recipeTypes";

export async function getRecipeTypes(query, sortBy, sortOrder) {
  return await getRecords("name", query, RECIPE_TYPES_ENDPOINT, sortBy, sortOrder);
}

export async function createRecipeType(recipeType) {
  return createRecord(RECIPE_TYPES_ENDPOINT, recipeType);
}

export async function getRecipeType(id) {
  return getRecord(RECIPE_TYPES_ENDPOINT, id);
}

export async function updateRecipeType(id, updatedRecipeType) {
  return updateRecord(RECIPE_TYPES_ENDPOINT, id, updatedRecipeType)
}

export async function deleteRecipeType(id) {
  return deleteRecord(RECIPE_TYPES_ENDPOINT, id);
}
