import React, { useEffect, useState } from "react";
import { Form, useSubmit, redirect } from "react-router-dom";

import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormSelect from "react-bootstrap/FormSelect";

import { createRecipe } from "../../rest/recipes";

// Create a new recipe record when they click
// the New button and navigate to the edit recipe page.
// Preserve the state of the search/filter menu.
export async function action({request}) {
  const recipe = await createRecipe();
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const q = updates["q"];
  const qType = updates["qType"];
  return redirect(`/recipes/${recipe.id}?q=${q}&qType=${qType}`);
}

export default function NewRecipe({
  q,
  qType,
  recipeTypes,
  formChanged,
  setFormChanged,
}) {

  // Save old values of search and filter fields for
  // when they are changed while a form with unsaved changes
  // is open, so we can return them to their previous state.
  const [oldValue, setOldValue] = useState("");
  const [oldTypeValue, setOldTypeValue] = useState("");
  const submit = useSubmit();

  // Update the search/filter input fields
  // if they use the back or forward buttons.
  useEffect(() => {
    // @ts-ignore
    document.getElementById("q").value = q;
  }, [q]);

  useEffect(() => {
    // @ts-ignore
    document.getElementById("qType").value = qType;
  }, [qType]);

  // Display two forms. The first form for submitting search
  // and filter parameters, and the second to create new recipes.
  return (
    <div className="search">
      <Form id="search-form" role="search">
        <InputGroup id="search" className="d-flex flex-nowrap">
          <InputGroup.Text id="search-symbol">🔍</InputGroup.Text>
          <FormControl
            id="q"
            name="q"
            aria-label="Search recipes."
            placeholder="Search"
            type="search"
            defaultValue={q}
            onChange={(event) => {
              if (
                !formChanged ||
                window.confirm(
                  "There are unsaved changes to the current recipe. Do you wish to continue?"
                )
              ) {
                setFormChanged(false);
                setOldValue(q);
                submit(event.currentTarget.form);
              } else {
                event.currentTarget.value = oldValue;
                event.currentTarget.blur();
              }
            }}
          />
        </InputGroup>

        <FormSelect
          id="qType"
          name="qType"
          className="me-2 mt-2"
          defaultValue="0"
          placeholder="Recipe Type"
          onChange={(event) => {
            if (
              !formChanged ||
              window.confirm(
                "There are unsaved changes to the current recipe. Do you wish to continue?"
              )
            ) {
              setFormChanged(false);
              setOldTypeValue(qType);
              submit(event.currentTarget.form);
            } else {
              event.currentTarget.value = oldTypeValue;
              event.currentTarget.blur();
            }
          }}
        >
          <option value="0">Filter by recipe type.</option>
          {recipeTypes.map((recipeType) => (
            <option value={recipeType.id} key={recipeType.id}>
              {recipeType.typeName}
            </option>
          ))}
        </FormSelect>
      </Form>
      <Form method="post" className="ms-2">
        <FormControl type="hidden" name="q" value={q} />
        <FormControl type="hidden" name="qType" value={qType} />        
        <Button type="submit">New</Button>
      </Form>
    </div>
  );
}
