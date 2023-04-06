
const RECIPES_ENDPOINT = "https://642e25ec2b883abc6407dd04.mockapi.io/api/v1/recipes";
class RecipesApi {

  // static async getFamilyMember(id) {

  //   const response = await fetch(
  //     this.url + `/${id}`, 
  //     {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" }
  //     });
  //   return await response.json();
  // }

  getRecipes = async (query) => {
    try {
      const url = new URL(RECIPES_ENDPOINT);
      url.searchParams.append('desc', query);     
console.log("url", url);       
      const resp = await fetch(url);
      const data = await resp.json();
      return data;
    } catch (e) {
      throw new Error("Error occurred in RecipesApi.getRecipes get method.");
    }
  };

  getRecipe = async (id) => {
    try {

  console.log("RecipesApi.getRecipe, id=" + id);
      const url = new URL(RECIPES_ENDPOINT);
      url.searchParams.append('id', id);
  console.log("url", url);         
      const resp = await fetch(url);
      const data = await resp.json();
      return (data? data[0] : {});
    } catch (e) {
      console.log("Error occurred in RecipesApi.getRecipe get method.", e);
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
      console.log("Error occurred in RecipesApi.updateRecipe put method.", e);
    }
  };

  createRecipe = async (recipe) => {
    try {
console.log("createRecipe supplying recipe = ", recipe);      
      const resp = await fetch(`${RECIPES_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      return await resp.json();
      
    } catch (e) {
      console.log("Error occurred in RecipesApi.createRecipe post method.", e);
    }
  }; 
  
  delete = async (id) => {
    try {
      const resp = await fetch(`${RECIPES_ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });
      return await resp.json();
      
    } catch (e) {
      console.log("Error occurred in RecipesApi delete method.", e);
    }
  };

}

export const recipesApi = new RecipesApi();
