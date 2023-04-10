import { 
  Form, 
  useLoaderData,
  useFetcher 
} from "react-router-dom";
import { 
  getRecipe, 
  updateRecipe 
} from "../recipes";
import Button from "react-bootstrap/Button";

export async function action({ request, params }) {

console.log("recipe action function");
  let formData = await request.formData();
console.log("formData.get('favorite')=", formData.get("favorite"));  
  return updateRecipe(params.recipeId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({ params }) {
  
console.log("recipe.jsx, params = " + JSON.stringify(params));
  const recipe = await getRecipe(params.recipeId);
  if (!recipe) {
    throw new Response("", {
      status: 404,
      statusText: "Recipe Not Found",
    });
  }
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

        <div className="d-flex justify-content-start">
          <Form action="edit">
            <Button type="submit" className="me-2">
              Edit
            </Button>
          </Form>
          <Form
            method="post"
            action="delete"
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
  const fetcher = useFetcher();
  
  let favorite = recipe.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <Button
        type="submit" 
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </Button>
    </fetcher.Form>
  );
}
