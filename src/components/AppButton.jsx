import React from "react";
import Button from "react-bootstrap/Button";

export default function AppButton({label, buttonType}) {
  return <Button className="appColor1" type="{buttonType}" >{label}</Button>;
}
