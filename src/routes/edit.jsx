import { 
  Form, 
  useLoaderData, 
  redirect,
  useNavigate 
} from "react-router-dom";
import { updateRecipe } from "../recipes";

import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import FormText from "react-bootstrap/FormText";
import Button from "react-bootstrap/Button";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateRecipe(params.recipeId, updates);
  return redirect(`/recipes/${params.recipeId}`);
}

export default function EditRecipe() {
  const { recipe } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post">
      <h3>Edit Recipe</h3>

      <FormGroup className="mb-3">
        <label>
          <span>Description</span>
          <FormControl
            type="text"
            maxLength="30"
            placeholder="Description"
            name="desc"
            defaultValue={recipe.desc}
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
          }}>
            Cancel
        </Button>
      </p>
    </Form>
  );
}
