import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DisplayRecipe, { loader as recipeLoader } from "./components/recipes/DisplayRecipe";
import Layout, { loader as layoutLoader } from "./components/Layout";
import EditRecipe, { loader as editRecipeLoader, action as editAction } 
from "./components/recipes/EditRecipe";

import Default from "./components/Default";
import ErrorPage from "./components/ErrorPage";

import { action as deleteAction } from "./routes/delete";
import { action as createRecipe } from "./components/recipes/NewRecipe";
import { action as editStarAction } from "./components/recipes/FavoriteStar";

// Define our routes for React Router.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    action: createRecipe,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Default /> },
          {
            path: "recipes/:recipeId",
            element: <DisplayRecipe />,
            loader: recipeLoader,
            action: editStarAction,
          },
          {
            path: "recipes/:recipeId/edit",
            element: <EditRecipe />,
            loader: editRecipeLoader,
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
