import React, { useState } from "react";
import classes from "../styles/CardSingleItem.module.css";

export default function CardSingleItem({
  id,
  image,
  productName,
  price,
  action,
}) {
  const [qt, setQt] = useState(1);

  return (
    <div className={classes.singleItem}>
      <div className={classes.ItemImage}>
        <img src={`/uploads/productImages/${image}`} alt="card_item_image" />
      </div>
      <div className={classes.itemAction}>
        <i onClick={() => action(id)} className="fal fa-trash-alt"></i>
      </div>
      <div className={classes.ItemName}>
        <h4>{productName}</h4>
      </div>
      <div className={classes.itemQT}>
        <input
          type="number"
          min="1"
          value={qt}
          onChange={(e) => setQt(e.target.value)}
        />
      </div>
      <div className={classes.itemPrice}>
        <h4>{price * qt} Tk</h4>
      </div>
    </div>
  );
}
