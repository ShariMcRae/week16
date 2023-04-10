import React from "react";
import ReactDOM from "react-dom/client";
import { 
  createBrowserRouter, 
  RouterProvider 
} from "react-router-dom";

import DisplayRecipe, { loader as recipeLoader } from "./components/DisplayRecipe";
import { action as editStarAction } from "./components/FavoriteStar";

import Layout, {
  loader as layoutLoader,
} from "./components/Layout";

import {
  action as createRecipe,
} from "./components/SearchRecipes";

import EditRecipe, { 
  loader as editRecipeLoader,
  action as editAction 
} from "./components/EditRecipe";

import { 
  action as deleteAction 
} from "./routes/delete";

import Settings from "./components/Settings";
import Default from "./components/Default";
import ErrorPage from "./error-page";

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
          {
            path: "settings",
            element: <Settings />,
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
