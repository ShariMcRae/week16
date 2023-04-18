import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Form, useSubmit, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
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
  return redirect(`/recipes/${recipe.id}`);
}

export default function NewRecipe({ q, context }) {
  const submit = useSubmit();
  const [oldValue, setOldValue] = useState("");

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
              
              if (
                !context[0] ||
                window.confirm(
                  "There are unsaved changes to the current recipe. Do you wish to continue?"
                )
              ) {
                context[1](false);
                setOldValue(q);
                submit(event.currentTarget.form);
              } else {
                event.currentTarget.value = oldValue;
                event.currentTarget.blur();
              }
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
