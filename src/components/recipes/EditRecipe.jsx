import React from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateRecipe, getRecipe } from "../../rest/recipes";

import Stack from "react-bootstrap/Stack";

import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IngredientList from "./IngredientList";

// Save changes to the recipe, and
// redirect to the Recipe page.
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  // move ingredients into an array
  const filteredKeys = Object.keys(updates).filter(key => key.startsWith("ingredients"));
  const ingredients = [];
  filteredKeys.forEach((key) => {
    ingredients.push(updates[key]);
    delete updates[key];
  });

  await updateRecipe(params.recipeId, {...updates, ingredients: ingredients});
  return redirect(`/recipes/${params.recipeId}`);
}

// Load the data for the specified recipe.
// If recipe not found, throw an error.
export async function loader({ params }) {
  console.log("CALLING LOADER");
  const recipe = await getRecipe(params.recipeId);
  if (!recipe) throw new Error("Recipe not found.");
  return { recipe };
}

// Render the form for editing a recipe.
export default function EditRecipe() {
  const navigate = useNavigate();
  // @ts-ignore
  const { recipe } = useLoaderData();

  return (
    <Stack direction="horizontal">
      <Form method="post">
        <Row>
          <h3>Edit Recipe</h3>
        </Row>
        <Row>
          <Col className="col-sm me-4">

            <FormGroup className="mb-3">
              <label>
                <span>Description</span>
                <FormControl
                  type="text"
                  placeholder="Description"
                  name="description"
                  defaultValue={recipe.description}
                  style={{ width: "20rem" }}
                  aria-label="Description"
                />
              </label>
            </FormGroup>

            <FormGroup className="mb-3">
              <label>
                <span>Image URL</span>
                <FormControl
                  type="text"
                  placeholder="Image URL"
                  name="imageURL"
                  defaultValue={recipe.imageURL}
                  style={{ width: "20rem" }}
                  aria-label="Image URL"
                />
              </label>
            </FormGroup>

            <IngredientList ingredients={recipe.ingredients} />

          </Col>
          <Col>
            <FormGroup className="mb-3">
              <label>
                <span>Instructions</span>
                <FormControl
                  as="textarea"
                  placeholder="Instruction"
                  name="instructions"
                  defaultValue={recipe.instructions}
                  aria-label="Instruction"
                  style={{ height: "20rem", width: "30rem" }}
                />
              </label>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit">Save</Button>
            {"  "}
            <Button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Stack>
  );
}
