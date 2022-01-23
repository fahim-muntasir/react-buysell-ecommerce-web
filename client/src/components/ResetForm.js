import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import classes from "../styles/SigninForm.module.css";
import Button from "./Button";
import TextInput from "./TextInput";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [defaultError, setDefaultError] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const notify = (msg) => toast(msg);

  const signinFormHandlear = (e) => {
    e.preventDefault();
    setFormSubmit(true);
    fetch("http://localhost:3030/reset", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setFormSubmit(false);
          notify(data.msg);
          setEmail("");
        } else {
          setDefaultError(data.error);
        }
      });
  };

  return (
    <div className={classes.signInForm}>
      <ToastContainer />
      <form onSubmit={signinFormHandlear}>
        <div className={classes.inputEmail}>
          <i className="fad fa-envelope"></i>
          <TextInput
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {defaultError && (
          <div className="errorMessage">
            <p>{defaultError}</p>
          </div>
        )}
        <div className={classes.signInSubmitBtn}>
          {formSubmit && (
            <Button disabled={true}>
              <i className="fas fa-spinner fa-spin"></i> Sending...
            </Button>
          )}
          {!formSubmit && (
            <Button type="submit">Send mail for reset password</Button>
          )}
        </div>
      </form>
    </div>
  );
}
