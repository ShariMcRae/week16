import React from "react";
import { useRouteError } from "react-router-dom";

// Pretty much all of our errors 
// will now be handled by this page.

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{
// @ts-ignore
        error.statusText || error.message}</i>
      </p>
    </div>
  );
}