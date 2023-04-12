import { Form, useLoaderData } from "react-router-dom";
import { getRecipe } from "../../rest/recipes";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import FavoriteStar from "./FavoriteStar";

// Load the data for the specified recipe.
// If recipe not found, throw an error.
export async function loader({ params }) {
  const recipe = await getRecipe(params.recipeId);
  if (!recipe) throw new Error("Recipe not found.");
  return { recipe };
}

// Display specified recipe with buttons for
// making it a favorite, editing, and deleting.
export default function DisplayRecipe() {
  const { recipe } = useLoaderData();
  return (
    <div id="recipe">
      <div className="me-4">
        {recipe.imageURL ? (
          <img
            alt="Recipe"
            className="img-thumbnail"
            key={recipe.imageURL}
            src={recipe.imageURL || null}
          />
        ) : (
          <i>No Image</i>
        )}{" "}
        <h3>
          {recipe.description ? (
            <>{recipe.description}</>
          ) : (
            <i>No Description</i>
          )}{" "}
          <FavoriteStar recipe={recipe} />
        </h3>
        {recipe.ingredients && (
          <div className="my-3">
            <h5>Ingredients</h5>
            {recipe.ingredients.map((ingredient, index) => (
              <ListGroup.Item key={index}>
                <span>{ingredient}</span>
              </ListGroup.Item>
            ))}
          </div>
        )}
      </div>
      <div>
        <h5>Instructions</h5>
        {recipe.instructions && <p className="me-5">{recipe.instructions}</p>}
      </div>

      <div>
        <div className="d-flex justify-content-start">
          <Form action="edit">
            <Button type="submit" className="me-2">
              Edit
            </Button>
          </Form>

          {/* We post the form when deleting (unlike when editing)
              to trigger a refresh of the navigation pane. */}
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm that you want to delete this recipe."
                )
              )
                event.preventDefault();
            }}
          >
            <Button type="submit">Delete</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
