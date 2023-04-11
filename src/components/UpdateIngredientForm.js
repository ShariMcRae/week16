import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function UpdateIngredientForm(
    { oldQuantity, oldUnits, oldName, changeIngredient }) {

  const [quantity, setQuantity] = useState(oldQuantity);
  const [units, setUnits] = useState(oldUnits);
  const [name, setName] = useState(oldName);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (quantity && units && name) {
        changeIngredient(quantity, units, name);      
  
    } else {
      alert("Invalid ingredient data.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <Form.Control
                type="text"
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </div>
            <div className="col-sm-2">
              <Form.Control
                type="text"
                placeholder="Units"
                onChange={(e) => setUnits(e.target.value)}
                value={units}
              />
            </div>
            <div className="col-sm-2">
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>            
            <div className="col-sm mt-1">
              <Button type="submit" className="btn-sm">
                Update
              </Button>
            </div>
          </div>
        </div>
      </Form.Group>
    </Form>
  );
}
