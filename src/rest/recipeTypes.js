import {
  getRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} from "./api";

// Provides CRUD methods for accessing
// recipeTypes located at MockApi.com.

const RECIPE_TYPES_ENDPOINT =
  "https://642e25ec2b883abc6407dd04.mockapi.io/api/v1/recipeTypes";

export async function getRecipeTypes(query, sortBy, sortOrder) {
console.log("getRecipeTypes, query", query);
  const records = await getRecords(
    "typeName",
    query,
    RECIPE_TYPES_ENDPOINT,
    sortBy,
    sortOrder
  );
console.log("getRecipeTypes, records", records);
  return records;
}

export async function createRecipeType(recipeType) {
console.log("createRecipeType, recipeType", recipeType);  
  return await createRecord(RECIPE_TYPES_ENDPOINT, recipeType);
}

export async function getRecipeType(id) {
  const recipeType = await getRecord(RECIPE_TYPES_ENDPOINT, id);
console.log("recipeType", recipeType);
  if (recipeType) return recipeType;
  else return {id: "0", typeName: ""};
  //return record;
}

export async function updateRecipeTypes(updatedRecipeTypes) {
console.log("updateRecipeTypes, updatedRecipeTypes=", updatedRecipeTypes);

  updatedRecipeTypes.forEach(async (recipeType) => {
    if (recipeType.id) {
      await updateRecord(
        RECIPE_TYPES_ENDPOINT,
        recipeType.id,
        recipeType
      );
    }
    else {
console.log("creating record, recipeType", recipeType);
      await createRecipeType(recipeType);
    }
  });
}

export async function updateRecipeType(id, updatedRecipeType) {
  return await updateRecord(RECIPE_TYPES_ENDPOINT, id, updatedRecipeType);
}

export async function deleteRecipeType(id) {
  return await deleteRecord(RECIPE_TYPES_ENDPOINT, id);
}
