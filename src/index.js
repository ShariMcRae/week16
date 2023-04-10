import React from "react";
import ReactDOM from "react-dom/client";
import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";

import Recipe, {
  loader as recipeLoader,
  action as recipeAction,
} from "./routes/recipe";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import EditRecipe, { 
  action as editAction 
} from "./routes/edit";

import { 
  action as deleteAction 
} from "./routes/delete";

import ErrorPage from "./error-page";
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "recipes/:recipeId",
            element: <Recipe />,
            loader: recipeLoader,
            action: recipeAction,
          },
          {
            path: "recipes/:recipeId/edit",
            element: <EditRecipe />,
            loader: recipeLoader,
            action: editAction,
          },
          {
            path: "recipes/:recipeId/delete",
            action: deleteAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
