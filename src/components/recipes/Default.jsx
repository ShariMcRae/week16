import React from "react";
import recipeImg from "../../images/dinnerPlate.webp";
export default function Default() {
  return (
    <div className="center-on-page"> <h1 className="fw-bolder">Aubree's Recipe Library</h1><br/>
      <img width="150" src={recipeImg} alt="Recipe icon."/>
    </div>
  );
}
