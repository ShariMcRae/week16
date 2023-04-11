import Card from "react-bootstrap/Card";
import Ingredient from "./Ingredient";

export default function IngredientList({ recipe, updateRecipe }) {

  const deleteIngredient = (ingredientId) => {
    const updatedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.filter((ingredient) => ingredient._id !== ingredientId),
    };
    updateRecipe(updatedRecipe);
  };

  const updateIngredient = (updatedIngredient) => {
    const updatedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) => 
        ingredient._id !== updatedIngredient._id ? ingredient : updatedIngredient),
    };
    updateRecipe(updatedRecipe);
  };

  return (
    <Card.Body>
      <h6>Ingredients:</h6>
      {
      
      /* {recipe.ingredients.map((ingredient, index) => (
          <Ingredient
            key={index}
            ingredient={ingredient}
            updateIngredient={updateIngredient}
            deleteIngredient={deleteIngredient}
          />
        ))} */}
    </Card.Body>        
  );
}
