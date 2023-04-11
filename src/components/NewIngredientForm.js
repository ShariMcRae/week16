import { useState } from "react";
import { Form } from "react-router-dom";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export default function NewIngredientForm({ addIngredient }) {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [units, setUnits] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && quantity && units) {
      addIngredient({ name, quantity, units });
      // setName("");
      // setQuantity("");
      // setUnits("");
    } else {
      alert("Invalid ingredient data.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <div className="container">
          <div className="row">
            <div className="col-sm text-end mt-2">
              <h6>New Ingredient:</h6>
            </div>
            <div className="col-sm-2">
              <FormControl
                type="text"
                aria-label="Quantity"
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </div>
            <div className="col-sm-2">
              <FormControl
                type="text"
                aria-label="Unit"
                placeholder="Unit"
                onChange={(e) => setUnits(e.target.value)}
                value={units}
              />
            </div>
            <div className="col-sm">
              <FormControl
                type="text"
                aria-label="Name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>            
            <div className="col-sm-1 mt-1 me-2">
              <Button type="submit" className="btn-sm" title="Add new ingredient.">
                Add
              </Button>
            </div>
          </div>
        </div>
      </FormGroup>
    </Form>
  );
}
