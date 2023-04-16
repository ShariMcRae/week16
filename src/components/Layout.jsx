import { Outlet, useLoaderData } from "react-router-dom";
import { getRecipes } from "../rest/recipes";
import recipeImg from "../images/dinnerPlate.webp";
import NewRecipe from "./recipes/NewRecipe";
import RecipeList from "./recipes/RecipeList";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/index.css";
import { useState } from "react";
import React from "react";

// Load the list of recipes matching the
// search parameters.
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const recipes = await getRecipes(q);
  recipes.sort(compareFn);
  return { recipes, q };
}

function compareFn(a, b) {
  if (a.description.toLowerCase() < b.description.toLowerCase()) {
    return -1;
  }
  if (a.description.toLowerCase() > b.description.toLowerCase()) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

// Provides the page layout with a navigation
// pane on the left side of the page.
export default function Layout() {
  // @ts-ignore
  const { recipes, q } = useLoaderData();
  const [isHidden, setIsHidden] = useState(false);
  const [formChanged, setFormChanged] = useState(false);

  const toggleClass = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <div id="sidebar" className={` ${isHidden ? "hidden" : ""}`}>
        <h3 className="d-flex flex-nowrap">
          <img width="50" className="ms-2" src={recipeImg} alt="Recipe Library icon." />
          <span className="ps-4 pt-2">Recipe Library</span>
        </h3>
        <NewRecipe q={q} context={[formChanged, setFormChanged]}/>
        <RecipeList recipes={recipes} context={[formChanged, setFormChanged]}/>
      </div>
      <div
        id="hideBar"
        onClick={toggleClass}
        data-toggle="tooltip"
        title="Click to hide/show menu!"
      ></div>
      <div id="detail" className="px-5 py-4">
        <Outlet context={[formChanged, setFormChanged]}/>
      </div>
    </>
  );
}
