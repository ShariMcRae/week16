// Class RecipesApi provides CRUD methods for accessing the
// data located at MockApi.com. We create one instance and export it.

const RECIPES_ENDPOINT = "https://642e25ec2b883abc6407dd04.mockapi.io/api/v1/recipes";
class RecipesApi {

  getRecipes = async (query) => {
    try {
      const url = new URL(RECIPES_ENDPOINT);
      url.searchParams.append('desc', query?query:"");           
      const resp = await fetch(url);
      const data = await resp.json();
      return data;
    } catch (e) {
      const msg = "Error occurred in RecipesApi.getRecipes get method.";
      console.log(msg, e);
      throw new Error(msg);
    }
  };

  getRecipe = async (id) => {
    try {
      const url = new URL(RECIPES_ENDPOINT);
      url.searchParams.append('id', id); 
      const resp = await fetch(url);
      const data = await resp.json();
      return (data? data[0] ?? null : {});
      
    } catch (e) {
      const msg = "Error occurred in RecipesApi.getRecipe get method.";
      console.log(msg, e);
      throw new Error(msg);
    }
  };

  updateRecipe = async (id, recipe) => {
    try {
      const resp = await fetch(`${RECIPES_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      return await resp.json();
      
    } catch (e) {
      const msg = "Error occurred in RecipesApi.updateRecipe get method.";
      console.log(msg, e);
      throw new Error(msg);
    }
  };

  createRecipe = async (recipe) => {
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
  }; 
  
  deleteRecipe = async (id) => {
    try {
      const resp = await fetch(`${RECIPES_ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
      return await resp.json();
      
    } catch (e) {
      const msg = "Error occurred in RecipesApi.deleteRecipe get method.";
      console.log(msg, e);
      throw new Error(msg);
    }
  };
}

export const recipesApi = new RecipesApi();
