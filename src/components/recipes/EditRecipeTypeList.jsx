import React, { useState } from "react";
import { Button, FormControl, Modal, Stack } from "react-bootstrap";
import { updateRecipeTypes, getRecipeTypes } from "../../rest/recipeTypes";

export default function EditRecipeTypeList({ recipeTypes, setRecipeTypes }) {

  const [show, setShow] = useState(false);
  const [newRecipeType, setNewRecipeType] = useState("");
  const [newRecipeTypes, setNewRecipeTypes] = useState(recipeTypes);
  if (!newRecipeTypes) throw new Error("Recipe types not found.");

  async function handleClose() {
console.log("handleClose, newRecipeTypes", newRecipeTypes);
    await updateRecipeTypes(newRecipeTypes);
    const temp = await getRecipeTypes("", "typeName", "asc");
console.log("handleClose, temp", temp);
    setRecipeTypes(temp);
    setShow(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newObject = { id: name, typeName: value };
    var temp = [];
    newRecipeTypes.forEach((recipeType) => temp.push(recipeType.id === newObject.id ? newObject : recipeType));
    setNewRecipeTypes(temp);
  };

  const handleShow = () => {
    setShow(true);
  };

  const addRecipeType = () => {
    let temp = [...newRecipeTypes];
    temp.push({ typeName:newRecipeType });
    setNewRecipeType("");
    setNewRecipeTypes(temp);
//console.log("addRecipeType, updated", newRecipeTypes);    
  };

  return (
    <>
      {" "}
      <Button onClick={handleShow} className="px-1 py-1 my-1 btn-sm">
        ✏️
      </Button>
      <Modal show={show} onHide={handleClose} size="sm" backdrop="static">
        <Modal.Header closeButton>Recipe Types</Modal.Header>
        <Modal.Body>
          {newRecipeTypes.map((recipeType, index) => (
            <FormControl
              key={index}
              className="m-1"
              type="text"
              onChange={(event) => handleChange(event)}
              name={recipeType.id}
              value={recipeType.typeName}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Stack
            // @ts-ignore
            gap="2"
            direction="horizontal"
          >
            <FormControl
              name="newRecipeType"
              aria-label="New recipe type."
              placeholder="New recipe type"
              type="text"
              value={newRecipeType}
              onChange={(event) => setNewRecipeType(event.currentTarget.value)}
            />
            <Button
              className="btn-sm"
              type="button"
              onClick={() => addRecipeType()}
            >
              Add
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </>
  );
}
