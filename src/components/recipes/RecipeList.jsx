import { NavLink } from "react-router-dom";
import { Alert, Nav } from "react-bootstrap";
import React from "react";

export default function RecipeList({ recipes, context }) {
  return (
    <Nav id="recipes">
      {recipes.length ? (
        <>
          {recipes.map((recipe) => (
            <NavLink
              key={recipe.id}
              to={`recipes/${recipe.id}`}
              onClick={(event) => {
                if (
                  !context[0] ||
                  window.confirm(
                    "There are unsaved changes to the current recipe. Do you wish to continue?"
                  )
                )
                  context[1](false);
                else 
                  event.preventDefault();
              }}
            >
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
