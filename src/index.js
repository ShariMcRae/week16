import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import ErrorPage from "./error-page";
import Recipe, {loader as recipeLoader} from "./routes/recipe";
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import EditRecipe, { action as editAction, } from "./routes/edit";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

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
