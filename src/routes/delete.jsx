import { redirect } from "react-router-dom";
import { deleteRecipe } from "../recipes";

export async function action({ params }) {
  await deleteRecipe(params.recipeId);
  return redirect("/");
}