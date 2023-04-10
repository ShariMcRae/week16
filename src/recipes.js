// Provides CRUD methods for accessing the
// data located at MockApi.com.

const RECIPES_ENDPOINT =
  "https://642e25ec2b883abc6407dd04.mockapi.io/api/v1/recipes";

export async function getRecipes(query) {
  try {
    const url = new URL(RECIPES_ENDPOINT);
    url.searchParams.append("description", query ? query : "");
    url.searchParams.append('sortBy', 'description');
    url.searchParams.append('order', 'asc');
    const resp = await fetch(url);
    const recipes = await resp.json();
    if (!recipes) return [];
    else return recipes;
  } catch (e) {
    const msg = "Error occurred in RecipesApi.getRecipes get method.";
    console.log(msg, e);
    throw new Error(msg);
  }
}

export async function createRecipe(recipe) {
  try {
    const resp = await fetch(`${RECIPES_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    return await resp.json();
  } catch (e) {
    const msg = "Error occurred in RecipesApi.createRecipe get method.";
    console.log(msg, e);
    throw new Error(msg);
  }
}

export async function getRecipe(id) {
  try {
    const url = new URL(RECIPES_ENDPOINT);
    url.searchParams.append("id", id);
    const resp = await fetch(url);
    const data = await resp.json();
    return data ? data[0] ?? null : {};
  } catch (e) {
    const msg = "Error occurred in RecipesApi.getRecipe get method.";
    console.log(msg, e);
    throw new Error(msg);
  }
}

export async function updateRecipe(id, updates) {
  try {
    const resp = await fetch(`${RECIPES_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return await resp.json();
  } catch (e) {
    const msg = "Error occurred in RecipesApi.updateRecipe get method.";
    console.log(msg, e);
    throw new Error(msg);
  }
}

export async function deleteRecipe(id) {
  try {
    const resp = await fetch(`${RECIPES_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await resp.json();
  } catch (e) {
    const msg = "Error occurred in RecipesApi.deleteRecipe get method.";
    console.log(msg, e);
    throw new Error(msg);
  }
}
