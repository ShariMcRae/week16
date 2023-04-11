import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import IngredientList from "./IngredientList";

import NewIngredientForm from "./NewIngredientForm";
//import "../css/Ingredients.css";

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const updates = Object.fromEntries(formData);
//   await updateRecipe(params.recipeId, updates);
//   return redirect(`/recipes/${params.recipeId}`);
// }

export default function Ingredients({recipe, updateRecipe}) {

  // Hoping this will trigger Ingredients to be rerendered.
  const addIngredient = (newIngredient) => {
    recipe = { ...recipe, ingredients: [...recipe.ingredients, newIngredient] };
    updateRecipe(recipe);
  };

  return (
    <CardGroup>
      <Card bg="light" text="dark" className="mt-3">
        <Card.Header className="pt-3">
          <h5>
            Ingredients
          </h5>
        </Card.Header>
        <IngredientList recipe={recipe} updateRecipe={updateRecipe}/>  
        <Card.Footer className="d-flex flex-row-reverse">
          {/* <NewIngredientForm addIngredient={addIngredient} /> */}
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}
