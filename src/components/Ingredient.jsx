import { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import UpdateIngredientForm from "./UpdateIngredientForm";

export default function Ingredient({ ingredient, updateIngredient, deleteIngredient }) {

  const [showEditForm, setShowEditForm] = useState(false);

  const changeIngredient = (newQuantity, newUnits, newName) => {
    const updatedIngredient = { ...ingredient, name: newName, units: newUnits, quantity: newQuantity };
    updateIngredient(updatedIngredient);
  };

  return (
    <ListGroup.Item className="border rounded">
      {!showEditForm && (
        <div>
          <Button
            className="btn-sm me-1 pt-0 pb-0"
            title="Delete Ingredient"
            onClick={(e) => deleteIngredient(ingredient._id)}
          >
            𐌢
          </Button>
          <Button
            className="btn-sm me-3 px-1 py-0"
            title="Edit House"
            onClick={(e) => setShowEditForm(true)}
          >
            ✎
          </Button>
          {ingredient.quantity} {ingredient.units} {ingredient.name}
          {/* <FormControl
              type="hidden"
              name="quantity"
              defaultValue={ingredient.quantity}
            />
          <FormControl
              type="hidden"
              name="units"
              defaultValue={ingredient.units}
            />
          <FormControl
              type="hidden"
              name="name"
              defaultValue={ingredient.name}
            /> */}
        </div>
      )}
      {showEditForm && (
        <UpdateIngredientForm
          oldQuantity={ingredient.quantity}
          oldUnits={ingredient.units}
          oldName={ingredient.name}
          changeIngredient={changeIngredient}
        />
      )}
    </ListGroup.Item>
  );
}
