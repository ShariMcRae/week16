import { NavLink } from "react-router-dom";
import { Alert, Nav } from "react-bootstrap";

export default function RecipeList({ recipes }) {

  return (
    <Nav id="recipes">
      {recipes.length ? (
        <>
          {recipes.map((recipe) => (
            <NavLink key={recipe.id} to={`recipes/${recipe.id}`}>
              <Alert variant="light" className="d-flex flex-nowrap">
                {recipe.description ? (
                  <>{recipe.description}</>
                ) : (
                  <i>No Description</i>
                )}{" "}
                {recipe.favorite && <span className="ps-2">★</span>}
              </Alert>
            </NavLink>
          ))}
        </>
      ) : (
        <p>
          <i>No recipes.</i>
        </p>
      )}
    </Nav>
  );
}
