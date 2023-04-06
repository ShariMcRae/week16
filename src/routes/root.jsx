import { 
  Outlet, 
  Link, 
  useLoaderData, 
  Form,
} from "react-router-dom";
import { getRecipes, createRecipe } from "../recipes";

export async function loader() {
  const recipes = await getRecipes("");
  return { recipes };
}

export async function action() {
  const recipe = await createRecipe();
  return { recipe };
}

export default function Root() {
  const { recipes } = useLoaderData();
    return (
      <>
        <div id="sidebar">
          <h1>Recipes</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search recipes"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {recipes.length ? (
              <ul>
                {recipes.map((recipe) => (
                  <li key={recipe.id}>
                    <Link to={`recipes/${recipe.id}`}>
                      {recipe.desc ? (
                        <>
                          {recipe.desc} 
                        </>
                      ) : (
                        <i>No Description</i>
                      )}{" "}
                      {recipe.favorite && <span>★</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No recipes.</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail"><Outlet /></div>
      </>
    );
  }