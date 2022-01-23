import React from "react";
import classes from "../styles/SingleCatagory.module.css";

export default function SingleCatagoey({ catagoryname, image }) {
  const myStyle = {
    backgroundImage: `url(./img/${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className={classes.singleCatagoryContainer} style={myStyle}>
      <div
        className={classes.catagoryImageOver}
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0px, rgb(0 0 0 / 52%) 60%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      >
        <h2>{catagoryname}</h2>
      </div>
    </div>
  );
}
