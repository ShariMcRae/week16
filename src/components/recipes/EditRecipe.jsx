import React, { useState } from "react";
import { redirect, useLoaderData, useNavigate, useOutletContext, Form } from "react-router-dom";

import {
  Stack,
  FormGroup,
  FormControl,
  Button,
  Row,
  Col, FormSelect
} from "react-bootstrap";

import { updateRecipe, getRecipe } from "../../rest/recipes";
import IngredientListEdit from "./IngredientListEdit";
import { getRecipeTypes } from "../../rest/recipeTypes";

// Load the data for the specified recipe.
// If recipe not found, throw an error.
export async function loader({ params }) {
  const recipeTypes = await getRecipeTypes();
  const recipe = await getRecipe(params.recipeId);
  if (!recipe) throw new Error("Recipe not found.");
  return { recipe, recipeTypes };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  // replace ingredient form entries with
  // an array of ingredients
  const filteredKeys = Object.keys(updates).filter(
    (key) => key.startsWith("ingredients"));
  filteredKeys.map((key) => updates[key])
  const ingredients = filteredKeys.map((key) => updates[key]);

  await updateRecipe(updates.id, { ...updates, ingredients: ingredients });
  return redirect(`/recipes/${params.recipeId}`);
}

// Render the form for editing a recipe.
export default function EditRecipe() {
  // @ts-ignore
  const { recipe, recipeTypes } = useLoaderData();
  // @ts-ignore
  const [ingredients, setIngredients] = useState(
    recipe.ingredients ? recipe.ingredients : []
  );
  const [newRecipe, setNewRecipe] = useState(recipe);
  const navigate = useNavigate();
  const context = useOutletContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
    // @ts-ignore
    context[1](true);
  };

  return (
    <Stack direction="horizontal">
      <Form method="post" onSubmit={() => 
// @ts-ignore
      context[1](false)}>
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
                  name="description"
                  className="mt-1"
                  value={newRecipe.description}
                  onChange={handleChange}
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
                  className="mt-1"
                  value={newRecipe.imageURL}
                  onChange={handleChange}
                  style={{ width: "20rem" }}
                  aria-label="Image URL"
                />
              </label>
            </FormGroup>
            <IngredientListEdit
              ingredients={ingredients}
              setIngredients={setIngredients}
              setFormChanged={
                // @ts-ignore
                context[1]
              }
            />
          </Col>
          <Col className="pt-0 mt-0">
            <FormGroup className="mb-3">
              <label>
                <span>Recipe Type</span>
                <div className="d-flex flex-nowrap mt-1">
                  <FormSelect
                    name="recipeType"
                    onChange={handleChange}
                    value={newRecipe.recipeType}
                  >
                    {recipeTypes.map((recipeType) => (
                      <option value={recipeType.name} key={recipeType.id}>
                        {recipeType.name}
                      </option>
                    ))}
                  </FormSelect>
                </div>
              </label>
            </FormGroup>

            <FormGroup className="mb-3">
              <label>
                <span>Instructions</span>
                <FormControl
                  className="mt-1"
                  as="textarea"
                  placeholder="Instruction"
                  name="instructions"
                  value={newRecipe.instructions}
                  onChange={handleChange}
                  aria-label="Instruction"
                  style={{ height: "20rem", width: "30rem" }}
                />
              </label>
            </FormGroup>
          </Col>
        </Row>
        <Row className="pt-2">
          <Col>
            <FormControl type="hidden" name="id" value={newRecipe.id} />
            <Button type="submit" className="me-2">
              Save
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (
                  // @ts-ignore
                  !context[0] ||
                  window.confirm(
                    "There are unsaved changes to the current recipe. Do you wish to continue?"
                  )
                ) {
                  // @ts-ignore
                  context[1](false);
                  navigate(`/recipes/${newRecipe.id}`);
                }
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
