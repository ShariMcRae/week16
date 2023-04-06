import { Form, useLoaderData } from "react-router-dom";
import { getRecipe } from "../recipes";
import Button from "react-bootstrap/Button";

export async function loader({ params }) {
  console.log("recipe.jsx, params = " + JSON.stringify(params));
  const recipe = await getRecipe(params.recipeId);
  return { recipe };
}

export default function Recipe() {
  const { recipe } = useLoaderData();

  return (
    <div id="recipe">
      <div>
      {recipe.imageURL ? 
        <img
          alt="Recipe"
          className="img-thumbnail"
          key={recipe.imageURL}
          src={recipe.imageURL || null}
        /> : <i>No Image</i>}{" "}
        
      </div>

      <div>
        <h3>
          {recipe.desc ? <>{recipe.desc}</> : <i>No Description</i>}{" "}
          <Favorite recipe={recipe} />
        </h3>

        {recipe.instructions && <p>{recipe.instructions}</p>}

        <div class="d-flex justify-content-start">
          <Form action="edit">
            <Button type="submit" className="me-2">
              Edit
            </Button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this recipe."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <Button type="submit">Delete</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ recipe }) {
  // yes, this is a `let` for later
  let favorite = recipe.favorite;
  return (
    <Form method="post">
      <Button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </Button>
    </Form>
  );
}
