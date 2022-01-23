import React from "react";
// import productImage from "../assets/img/bd_flag.jpg";
import classes from "../styles/Product.module.css";
import Button from "./Button";
import { useAuth } from "./context/Auth";

export default function Product({ id, price, image, productName }) {
  const { cardItemCount } = useAuth();

  const addToCard = () => {
    const productDetails = { id, price, image, productName };
    const getCardProductToLocalstore = JSON.parse(
      localStorage.getItem("bs_ci")
    );

    if (getCardProductToLocalstore) {
      const itemId = [];
      getCardProductToLocalstore.map((item) => itemId.push(item.id));

      if (!itemId.includes(id)) {
        getCardProductToLocalstore.push(productDetails);
        localStorage.setItem(
          "bs_ci",
          JSON.stringify(getCardProductToLocalstore)
        );
      }
    } else {
      localStorage.setItem("bs_ci", JSON.stringify([productDetails]));
    }
    cardItemCount();
  };

  return (
    <div className={classes.singleProduct}>
      <div className={classes.singleProductImage}>
        <img src={`/uploads/productImages/${image}`} alt="product_image" />
      </div>
      <div className={classes.productPrice}>
        <span>{price} Tk</span>
      </div>
      <Button onClick={addToCard} className={classes.addToCardBtn}>
        Add to card
      </Button>
    </div>
  );
}
