import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import classes from "../styles/SellingForm.module.css";
import Button from "./Button";
import { useAuth } from "./context/Auth";
import TextImput from "./TextInput";

export default function SellingForm() {
  const [productName, setProductName] = useState("");
  const [address, setAddress] = useState("");
  const [catagory, setCatagory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [avatar, setAvatar] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [defaultError, setDefaultError] = useState(false);

  const { addProduct, isLogin } = useAuth();
  const notify = (msg) => toast(msg);

  const productUploadHandlear = (e) => {
    e.preventDefault();
    setFormSubmit(true);

    if (isLogin) {
      setTimeout(() => {
        const productDetails = new FormData();
        productDetails.append("productName", productName);
        productDetails.append("address", address);
        productDetails.append("catagory", catagory);
        productDetails.append("productPrice", productPrice);
        productDetails.append("avatar", avatar);

        addProduct(productDetails, (response) => {
          if (!response.error) {
            console.log(response);
            notify(response.msg);
            setFormSubmit(false);
            setProductName("");
            setAddress("");
            setCatagory("");
            setProductPrice("");
            setAvatar("");
          } else {
            if (response.error.avatar) {
              notify(response.error.avatar["msg"]);
            }
            notify(response.error.msg);
            setFormSubmit(false);
          }
        });
      }, 1000);
    } else {
      setDefaultError("Please Login!");
      setFormSubmit(false);
    }
  };

  return (
    <div className={classes.signInForm}>
      <ToastContainer />
      <form onSubmit={productUploadHandlear} encType="multipart/form-data">
        <div className={classes.inputProductName}>
          <TextImput
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className={classes.inputAddress}>
          <TextImput
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={classes.inputProductCatagory}>
          <select
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
          >
            <option>T-shart1</option>
            <option>T-shart2</option>
            <option>T-shart3</option>
          </select>
        </div>
        <div className={classes.productPriceInput}>
          <TextImput
            type="text"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className={classes.productImage}>
          <TextImput
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        {defaultError && (
          <div className="errorMessage">
            <p>{defaultError}</p>
          </div>
        )}

        {formSubmit && (
          <div className={classes.signInSubmitBtn}>
            <Button disabled={true}>
              <i className="fas fa-spinner fa-spin"></i> Save...
            </Button>
          </div>
        )}

        {!formSubmit && (
          <div className={classes.signInSubmitBtn}>
            <Button type="submit">Save</Button>
          </div>
        )}
      </form>
    </div>
  );
}
