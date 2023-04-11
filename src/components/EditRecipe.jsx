import { useState } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateRecipe, getRecipe } from "../rest/recipes";
import Ingredients from "./Ingredients";

import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormText from "react-bootstrap/FormText";
import Button from "react-bootstrap/Button";

// Save changes to the recipe, and
// redirect to the Recipe page.
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateRecipe(params.recipeId, updates);
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
  const { recipe } = useLoaderData();
//   const [recipe, setRecipe] = useState(useLoaderData().recipe);


// console.log("inside EditRecipe, recipe", JSON.stringify(recipe));
// console.log("inside EditRecipe, recipe.description", recipe.description);
// console.log("inside EditRecipe, recipe.instructions", recipe.instructions);

//   const updateRecipe = (updatedRecipe) => {
//     setRecipe(updatedRecipe);
//   };

//   const [instructions, setInstructions] = useState(recipe.instructions);
//   const [imageURL, setImageURL] = useState(recipe.imageURL);
//   const [description, setDescription] = useState(recipe.description);
  

//   const handleSubmit = async (event) => {

//     event.preventDefault();
//     const updatedRecipe = { ...recipe, 
//       description: description, 
//       imageURL: imageURL, 
//       instructions: instructions};
//     await updateRecipe(updatedRecipe.recipeId, updatedRecipe);
//     setRecipe(updatedRecipe);
    
//   };  

  return (
    <>
      {/* <Form onSubmit={handleSubmit}> */}
      <Form method="post">
        <h3>Edit Recipe</h3>

        <FormGroup className="mb-3">
          <label>
            <span>Description</span>
            <FormControl
              type="text"
              maxLength="30"
              placeholder="Description"
              name="description"
              defaultValue={recipe.description}
              //onChange={(e) => setDescription(e.target.value)}              
              aria-label="Description"
              style={{ width: "30rem" }}
            />
            <FormText className="text-muted">(maximum length is 30)</FormText>
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
              //onChange={(e) => setImageURL(e.target.value)}              
              aria-label="Image URL"
              style={{ width: "30rem" }}
            />
          </label>
        </FormGroup>

        <FormGroup className="mb-3">
          <label>
            <span>Instruction</span>
            <FormControl
              as="textarea"
              placeholder="Instruction"
              name="instructions"
              defaultValue={recipe.instructions}
              //onChange={(e) => setInstructions(e.target.value)}              
              aria-label="Instruction"
              style={{ height: "10rem", width: "30rem" }}
            />
          </label>
        </FormGroup>
        <p>
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
        </p>
      </Form>
      {/* <Ingredients recipe={recipe} updateRecipe={updateRecipe}/> */}
    </>
  );
}
