import { redirect } from "react-router-dom";
import { deleteRecipe } from "../recipes";

// Delete the specified recipe and 
// redirect to the home page.
export async function action({ params }) {
  await deleteRecipe(params.recipeId);
  return redirect("/");
}