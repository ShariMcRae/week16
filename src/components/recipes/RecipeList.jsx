import { NavLink } from "react-router-dom";
import { Badge, ListGroup, Nav } from "react-bootstrap";
import React from "react";

export default function RecipeList({ recipes, formChanged, setFormChanged }) {
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
                  !formChanged ||
                  window.confirm(
                    "There are unsaved changes to the current recipe. Do you wish to continue?"
                  )
                )
                setFormChanged(false);
                else event.preventDefault();
              }}
            >
              <ListGroup>
                <ListGroup.Item
                  variant="flush"
                  className="d-flex justify-content-between px-2 py-1 align-items-start"
                >
                  <div>
                    {recipe.description ? (
                      <>{recipe.description}</>
                    ) : (
                      <i>No Description</i>
                    )}
                  </div>
                  <Badge bg="inherit" pill className="recipeList">
                    {recipe.favorite && <h5 className="recipeList">★</h5>}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
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
