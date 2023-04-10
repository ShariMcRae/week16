
import { Outlet, useLoaderData, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getRecipes} from "../recipes";
import recipeImg from "../images/dinnerPlate.webp";
import settingsImg from "../images/settings.webp";
import SearchRecipes from "./SearchRecipes";
import RecipeList from "./RecipeList";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

// Load the list of recipes matching the
// search parameters.
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const recipes = await getRecipes(q);
  return { recipes, q };
}

// Provides the page layout with a navigation
// pane on the left side of the page.
export default function Layout() {
  const { recipes, q } = useLoaderData();

  return (
    <>
      <div id="sidebar">
        <h3>
          <img width="50" src={recipeImg} alt="Recipe icon."/>
          <span className="ps-2 pe-4">Recipe Library</span>          
          <NavLink to={`settings`}>
            <Button className="btn-sm"><img width="25" src={settingsImg} alt="Recipe icon."/></Button> 
          </NavLink>
        </h3>
        <SearchRecipes q={q}/>
        <RecipeList recipes={recipes}/>
      </div>

      <div id="detail" className="px-5 py-4">
        <Outlet />
      </div>
    </>
  );
}
