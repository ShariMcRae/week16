import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Form, useSubmit, redirect } from "react-router-dom";
import { useEffect } from "react";
import { createRecipe } from "../../rest/recipes";
import React from "react";

// Create a new recipe record when they click
// the New button and navigate to the edit recipe page.
export async function action() {
  let recipe = {
    description: "",
    instructions: "",
    ingredients: [],
    imageURL: "",
    favorite: false,
  };
  recipe = await createRecipe(recipe);
  return redirect(`/recipes/${recipe.id}/edit`);
}

export default function NewRecipe({ q }) {
  const submit = useSubmit();

  // Update the search input field if they use
  // the back or forward buttons.
  useEffect(() => {
    // @ts-ignore
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <div className="search">
      <Form id="search-form" role="search">
        <InputGroup id="search" className="d-flex flex-nowrap">
          <InputGroup.Text id="search-symbol">🔍</InputGroup.Text>
          <FormControl
            id="q"
            aria-label="Search recipes."
            placeholder="Search"
            type="search"
            defaultValue={q}
            onChange={(event) => {
              const isFirstSearch = q == null;
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              });
            }}
            name="q"
          />
        </InputGroup>
      </Form>
      <Form method="post" className="ms-2">
        <Button type="submit">New</Button>
      </Form>
    </div>
  );
}
