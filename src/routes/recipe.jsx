
import { Form, useLoaderData } from "react-router-dom";
import { getRecipe } from "../recipes";

export async function loader({ params }) {

console.log("recipe.jsx, params = " + JSON.stringify(params));
    const recipe = await getRecipe(params.recipeId);
    return { recipe };
  }

export default function Recipe() {
    const { recipe } = useLoaderData();
console.log("recipe.jsx, in Recipe, recipe = " + JSON.stringify(recipe));    
console.log("recipe.jsx, in Recipe, recipe.desc = " + recipe.desc);    

  return (
    <div id="recipe">
      <div>
        <img alt="Recipe"
          key={recipe.imageURL}
          src={recipe.imageURL || null}
        />
      </div>

      <div>
        <h1>
          {recipe.desc ? (
            <>
              {recipe.desc}
            </>
          ) : (
            <i>No Description</i>
          )}{" "}
          <Favorite recipe={recipe} />
        </h1>

        {recipe.instructions && <p>{recipe.instructions}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
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
            <button type="submit">Delete</button>
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
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}