import { 
    Form, 
    useLoaderData,   
    redirect,
} from "react-router-dom";
import { updateRecipe } from "../recipes";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
console.log("edit action submitting update = ", updates);   
console.log("params.recipeId", params.recipeId); 
    await updateRecipe(params.recipeId, updates);
    return redirect(`/recipes/${params.recipeId}`);
  }

export default function EditRecipe() {
  const { recipe } = useLoaderData();

  return (
    <Form method="post" id="recipe-form">

      <label>
        <span>Desc</span>
        <input
          placeholder="Description"
          aria-label="Description"
          type="text"
          name="desc"
          defaultValue={recipe.desc}
        />
      </label>    <br/>  
      <label>
        <span>Image URL</span>
        <input
          placeholder="image URL"
          aria-label="image URL"
          type="text"
          name="imageURL"
          defaultValue={recipe.imageURL}
        />
      </label><br/>
      <label>
        <span>Instruction</span>
        <textarea
          name="instructions"
          defaultValue={recipe.instructions}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button">Cancel</button>
      </p>
    </Form>
  );
}