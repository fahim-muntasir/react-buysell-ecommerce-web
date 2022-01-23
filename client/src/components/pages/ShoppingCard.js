import React, { useEffect, useState } from "react";
import classes from "../../styles/ShoppingCard.module.css";
import CardSingleItem from "../CardSingleItem";
import CheckoutSummary from "../CheckoutSummary";
import { useAuth } from "../context/Auth";
import Navbar from "../Navbar";

export default function ShoppingCard() {
  const [loading, setLoading] = useState(true);
  const [cardItem, setCardItem] = useState(
    localStorage.getItem("bs_ci")
      ? JSON.parse(localStorage.getItem("bs_ci"))
      : []
  );

  const { cardItemCount } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setCardItem(
        localStorage.getItem("bs_ci")
          ? JSON.parse(localStorage.getItem("bs_ci"))
          : []
      );
    }, 1000);
  }, []);

  const actionHandlear = (id) => {
    const getCardProduct = JSON.parse(localStorage.getItem("bs_ci"));
    getCardProduct.map((item, index) => {
      if (item.id === id) {
        getCardProduct.splice(index, 1);
      }
    });
    if (getCardProduct.length > 0) {
      localStorage.setItem("bs_ci", JSON.stringify(getCardProduct));
      setCardItem(
        localStorage.getItem("bs_ci")
          ? JSON.parse(localStorage.getItem("bs_ci"))
          : []
      );
    } else {
      localStorage.removeItem("bs_ci");
      setCardItem(
        localStorage.getItem("bs_ci")
          ? JSON.parse(localStorage.getItem("bs_ci"))
          : []
      );
    }
    cardItemCount();
  };

  let allPrice;
  cardItem.map((i) => (allPrice += i.price));

  return (
    <>
      <Navbar />
      {loading && (
        <div className="pageLoader">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}
      {!loading && (
        <div className="container">
          <div className={classes.shopplingCardAllItem}>
            <div className={classes.allItemList}>
              <div className={classes.cardTitle}>
                <h2>All Item</h2>
              </div>
              {cardItem.map((singleItem, index) => (
                <CardSingleItem
                  key={Math.random() * index}
                  id={singleItem.id}
                  image={singleItem.image}
                  productName={singleItem.productName}
                  price={singleItem.price}
                  action={actionHandlear}
                />
              ))}
            </div>
            <CheckoutSummary />
          </div>
        </div>
      )}
    </>
  );
}
