import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FormControl from "react-bootstrap/FormControl";

import { useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import {
  Outlet,
  useLoaderData,
  Form,
  NavLink,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getRecipes, createRecipe } from "../recipes";
import myImage from "../images/dinnerPlate.webp";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const recipes = await getRecipes(q);
  return { recipes, q };
}

export async function action() {
  const recipe = await createRecipe();
  return redirect(`/recipes/${recipe.id}/edit`);
}

export default function Root() {
  const { recipes, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h3>
          <img width="50" src={myImage} />
          <span className="px-3">Recipe Library</span>
        </h3>
        <div>
          <Form id="search-form" role="search">
            <InputGroup>
              <InputGroup.Text
                id="search-symbol"
                className={searching ? "loading" : ""}
              >
                🔍
              </InputGroup.Text>
              <FormControl
                id="q"
                aria-label="Search recipes"
                placeholder="Search"
                type="search"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
                name="q"
                style={{ width: "12rem" }}
              />
            </InputGroup>
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
                <NavLink
                  key={recipe.id}
                  to={`recipes/${recipe.id}`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                >
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
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
