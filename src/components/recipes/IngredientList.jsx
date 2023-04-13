import React from "react";
import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

export default function IngredientList({ ingredients }) {
  const [length, setLength] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");

  const removeIngredient = (index) => {
    ingredients.splice(index, 1);
    setLength(ingredients.length);
  };

  const addIngredient = () => {
    if (ingredients) ingredients.push(newIngredient);
    // @ts-ignore
    document.getElementById("newIngredient").value = "";
    setLength(ingredients.length);
  };

  return (
    <FormGroup className="pt-3 pb-4">
      <Card>
        <Card.Header>
          <Container className="p-0">
            <Row className="px-0">
              <Col className="px-2">
                <div>Ingredients</div>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body className="p-0">
          {ingredients.map((ingredient, index) => (
            <ListGroup.Item className="ingredient-list-item border" key={index}>
              <Button
                className="btn-sm me-1 pt-0 pb-0 me-2"
                title="Delete Ingredient"
                onClick={() => removeIngredient(index)}
              >
                𐌢
              </Button>
              {ingredient}

              <FormControl
                type="hidden"
                name={"ingredients[" + index + "]"}
                defaultValue={ingredients[index]}
              />
            </ListGroup.Item>
          ))}
        </Card.Body>

        <Card.Footer>
          {" "}
          <Stack 
// @ts-ignore
          gap="3" direction="horizontal">
            <FormControl
              id="newIngredient"
              aria-label="New Ingredient."
              placeholder="New Ingredient"
              type="text"
              defaultValue=""
              onChange={(event) => setNewIngredient(event.currentTarget.value)}
            />
            <Button
              className="btn-sm"
              type="button"
              onClick={() => addIngredient()}
            >
              Add
            </Button>
          </Stack>
        </Card.Footer>
      </Card>
    </FormGroup>
  );
}
