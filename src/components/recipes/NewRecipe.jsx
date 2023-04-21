import React from "react";
import { Form, redirect } from "react-router-dom";

import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { createRecipe } from "../../rest/recipes";

// Create a new recipe record when they click
// the New button and navigate to the edit recipe page.
// Preserve the state of the search/filter menu.
export async function action({ request }) {
  const recipe = await createRecipe();
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const q = updates["q"];
  const qType = updates["qType"];
  return redirect(`/recipes/${recipe.id}?q=${q}&qType=${qType}`);
}

// Display form to create new recipes.
export default function NewRecipe({ q, qType, unsavedChanges, setUnsavedChanges }) {
  return (
    <Form
      method="post"
      className="ms-2"
      onSubmit={(event) => {
        if (
          !unsavedChanges ||
          window.confirm(
            "There are unsaved changes to the current recipe. Do you wish to continue?"
          )
        )
          setUnsavedChanges(false);
        else event.preventDefault();
      }}
    >
      <FormControl type="hidden" name="q" value={q} />
      <FormControl type="hidden" name="qType" value={qType} />
      <Button type="submit">New</Button>
    </Form>
  );
}
