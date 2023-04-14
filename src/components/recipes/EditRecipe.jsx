import React, { useState } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";

import Stack from "react-bootstrap/Stack";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { updateRecipe, getRecipe } from "../../rest/recipes";
import IngredientListEdit from "./IngredientListEdit";

// Save changes to the recipe, and
// redirect to the DisplayRecipe page.
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  // replace ingredient form entries with
  // an array of ingredients
  const filteredKeys = Object.keys(updates).filter(key => key.startsWith("ingredients"));
  const ingredients = [];
  filteredKeys.forEach((key) => {
    ingredients.push(updates[key]);
    delete updates[key];
  });

  await updateRecipe(updates.id, {...updates, ingredients: ingredients});
  return redirect(`/recipes/${updates.id}`);
}

// Load the data for the specified recipe.
// If recipe not found, throw an error.
export async function loader({ params }) {
  const recipe = await getRecipe(params.recipeId);
  if (!recipe) throw new Error("Recipe not found.");
  return { recipe };
}

// Render the form for editing a recipe.
export default function EditRecipe() {

  // @ts-ignore
  const { recipe } = useLoaderData();
  const [newRecipe, setNewRecipe] = useState(recipe);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  return (
    <Stack direction="horizontal">
      <Form method="post">
        <Row className="my-3">
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
                  name="description" className="mt-1"
                  value={newRecipe.description} onChange={handleChange} 
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
                  name="imageURL" className="mt-1"
                  value={newRecipe.imageURL} onChange={handleChange}
                  style={{ width: "20rem" }}
                  aria-label="Image URL"
                />
              </label>
            </FormGroup>

            <IngredientListEdit ingredients={newRecipe.ingredients} />

          </Col>
          <Col>
            <FormGroup className="mb-3">
              <label>
                <span>Instructions</span>
                <FormControl className="mt-1"
                  as="textarea"
                  placeholder="Instruction"
                  name="instructions"
                  value={newRecipe.instructions} onChange={handleChange}
                  aria-label="Instruction"
                  style={{ height: "20rem", width: "30rem" }}
                />
              </label>
            </FormGroup>
          </Col>
        </Row>
        <Row className="pt-2">
          <Col>
          <FormControl
                type="hidden"
                name="id"
                value={newRecipe.id}
              />
            <Button type="submit" className="me-2">Save</Button>
            <Button
              type="button"
              onClick={() => {
                navigate(`/recipes/${newRecipe.id}`);
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

