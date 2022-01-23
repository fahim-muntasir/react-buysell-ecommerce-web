import React from "react";
import classes from "../styles/CheckoutSummary.module.css";
import Button from "./Button";

export default function CheckoutSummary() {
  return (
    <div className={classes.shoppingSummery}>
      <div className={classes.checkoutSummaryTitle}>
        <h4>Checkout Summary</h4>
      </div>
      <div className={classes.summaryDetails}>
        <select>
          <option>Bangladesh</option>
          <option>Pakistan</option>
        </select>
        <table>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>500 tk</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>500 tk</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>500 tk</td>
            </tr>
            <tr>
              <td>Payable Total</td>
              <td>500 tk</td>
            </tr>
          </tbody>
        </table>
        <div className={classes.checkoutBtnDiv}>
          <Button className={classes.checkoutBtn}>Checkout Now</Button>
        </div>
      </div>
    </div>
  );
}
