import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "../../styles/Products.module.css";
import Navbar from "../Navbar";
import Product from "../Product";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [searchProducts, setSearchProducts] = useState("");

  const { catagory } = useParams();

  useEffect(() => {
    fetch("http://localhost:3030/product/search", {
      method: "POST",
      body: JSON.stringify({ searchQuery: catagory }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setSearchProducts(result.products);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      {loading && (
        <div className="pageLoader">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}

      {!loading && (
        <div className={`container ${classes.productPageContainer}`}>
          <div className={classes.productTitle}>
            <h2>"{catagory}"</h2>
          </div>
          <div className={classes.allProducts}>
            {searchProducts.map((singleProduct, index) => (
              <Product
                key={Math.random() * index}
                id={singleProduct._id}
                productName={singleProduct.productName}
                price={singleProduct.price}
                image={singleProduct.productImage}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
