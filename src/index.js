import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./error-page";
import Recipe, {loader as recipeLoader} from "./routes/recipe";
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import EditRecipe, { action as editAction, } from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "recipes/:recipeId",
        element: <Recipe />,
        loader: recipeLoader,
      },  
      {
        path: "recipes/:recipeId/edit",
        element: <EditRecipe />,
        loader: recipeLoader,
        action: editAction,
      },      
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
