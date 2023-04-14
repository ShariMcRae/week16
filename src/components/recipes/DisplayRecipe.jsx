import { Form, useLoaderData } from "react-router-dom";
import { getRecipe } from "../../rest/recipes";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import FavoriteStar from "./FavoriteStar";
import React from "react";

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
  // @ts-ignore
  const { recipe } = useLoaderData();
  return (
    <div id="recipe">
      <div className="me-4">
        <div>
          <img
            className="img-thumbnail"
            key={recipe.imageURL}
            src={recipe.imageURL || null}
            alt={recipe.description}
          />
        </div>
        <h3>
          {recipe.description ? (
            <>{recipe.description}</>
          ) : (
            <i>No Description</i>
          )}{" "}
          <FavoriteStar recipe={recipe} />
        </h3>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <div className="my-3">
            <h5>Ingredients</h5>
            {recipe.ingredients.map((ingredient, index) => (
              <ListGroup.Item key={index}>
                <span>{ingredient}</span>
              </ListGroup.Item>
            ))}
          </div>
        ) : (
          <div className="my-3">
            <i>No Ingredients</i>
          </div>
        )}
      </div>
      <div>
        {recipe.instructions ? (
          <>
            <h5>Instructions</h5>
            <p className="me-5">{recipe.instructions}</p>
          </>
        ) : (
          <p className="me-5">
            <i>No Instructions</i>
          </p>
        )}
      </div>

      <div className="pt-2">
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
