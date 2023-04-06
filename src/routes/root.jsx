
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "../index.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { 
  Outlet, 
  useLoaderData, 
  Form, 
  NavLink,
  redirect 
} from "react-router-dom";
import { getRecipes, createRecipe } from "../recipes";

export async function loader() {
  const recipes = await getRecipes("");
  return { recipes };
}

export async function action() {
  const recipe = await createRecipe();
  return redirect(`/recipes/${recipe.id}/edit`);
}

export default function Root() {
  const { recipes } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>Recipes</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search recipes"
              placeholder="Search"
              type="search"
              name="q" style={{ width: '15rem' }}
            />

{/* <FormControl
            id="q"
            type="text"
            placeholder="Search"
            name="q"
            aria-label="Query String"
            style={{ width: "15rem" }}
          /> */}

            
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          {/* Because we use the post method, the <Root> will be refreshed. */}
          <Form method="post">
            <Button type="submit">New</Button>
          </Form>
        </div>
        <nav>
          {recipes.length ? (
            <>
              {recipes.map((recipe) => (
                <NavLink key={recipe.id} 
                         to={`recipes/${recipe.id}`}
                         className={({ isActive, isPending }) =>
                            isActive
                              ? "active"
                              : isPending
                              ? "pending"
                              : ""
                          }>
                  <Alert variant="light">
                    {recipe.desc ? <>{recipe.desc}</> : <i>No Description</i>}{" "}
                    {recipe.favorite && <span>★</span>}
                  </Alert>
                </NavLink>

              ))}
            </>
          ) : (
            <p>
              <i>No recipes.</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
