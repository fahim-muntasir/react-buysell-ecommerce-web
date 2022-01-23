import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import classes from "../styles/SigninForm.module.css";
import Button from "./Button";
import TextInput from "./TextInput";

export default function SignInForm() {
  const [newPassword, setNewPassword] = useState("");
  const [defaultError, setDefaultError] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  const signinFormHandlear = (e) => {
    e.preventDefault();
    setFormSubmit(true);
    fetch("http://localhost:3030/reset/newpassword", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          setFormSubmit(false);
          setNewPassword("");
          notify(result.msg);
          navigate("/signin");
        } else {
          setFormSubmit(false);
          setDefaultError(result.error.msg);
        }
      });
  };

  return (
    <div className={classes.signInForm}>
      <ToastContainer />
      <form onSubmit={signinFormHandlear}>
        <div className={classes.inputEmail}>
          <i className="fad fa-lock"></i>
          <TextInput
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
              <i className="fas fa-spinner fa-spin"></i> Updating...
            </Button>
          )}
          {!formSubmit && <Button type="submit">Update password</Button>}
        </div>
      </form>
    </div>
  );
}
