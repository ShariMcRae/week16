import { 
    getRecords,
    createRecord,
    getRecord,
    updateRecord,
    deleteRecord
   } from "./api";
  
  // Provides CRUD methods for accessing 
  // recipes located at MockApi.com.
  
  const INGREDIENTS_ENDPOINT =
    "https://642e25ec2b883abc6407dd04.mockapi.io/api/v1/ingredients";
  
  export async function getIngredients(query, sortBy, sortOrder) {
    return await getRecords(query, INGREDIENTS_ENDPOINT, sortBy, sortOrder);
  }
  
  export async function createIngredient(recipe) {
    return createRecord(INGREDIENTS_ENDPOINT, recipe);
  }
  
  export async function getIngredient(id) {
    return getRecord(INGREDIENTS_ENDPOINT, id);
  }
  
  export async function updateIngredient(id, updatedIngredient) {
    return updateRecord(INGREDIENTS_ENDPOINT, id, updatedIngredient)
  }
  
  export async function deleteIngredient(id) {
    return deleteRecord(INGREDIENTS_ENDPOINT, id);
  }
  