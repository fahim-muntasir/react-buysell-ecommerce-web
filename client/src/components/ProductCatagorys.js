import React from "react";
import { Link } from "react-router-dom";
import allCatagory from "../allCatagory.json";
import classes from "../styles/ProductCatagorys.module.css";
import SigleCatagoey from "./SingleCatagory";

export default function ProductCatagorys() {
  return (
    <div className={classes.productCatagoryContainer}>
      {allCatagory.map((element, index) => (
        <div key={Math.random() * index} className={classes.singleCatagoryDiv}>
          <Link to={`/product/${element.catagory}`}>
            <SigleCatagoey
              catagoryname={element.catagory}
              image={element.image}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
