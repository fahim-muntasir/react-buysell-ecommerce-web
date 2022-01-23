import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import classes from "../styles/SignUpForm.module.css";
import Button from "./Button";
import TextInput from "./TextInput";

export default function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [defaultError, setDefaultError] = useState("");

  // error state
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const reCaptchaVerify = (value) => {
    setVerify(value);
  };

  const signInSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);

    setTimeout(() => {
      if (
        !verify ||
        !fullName ||
        !email ||
        !mobileNum ||
        !password ||
        !confirmPassword
      ) {
        setDefaultError("Every fild is required");
        setFormSubmit(false);
      }

      if (verify) {
        if (password === confirmPassword) {
          setDefaultError(false);
          fetch("http://localhost:3030/signup", {
            method: "POST",
            body: JSON.stringify({
              name: fullName,
              email: email,
              mobileNo: mobileNum,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (!data.error) {
                setFullName("");
                setEmail("");
                setPassword("");
                setMobileNum("");
                setConfirmPassword("");
                setFormSubmit(false);
                navigate("/signin");
              } else {
                const errorArray = Object.keys(data.error);
                if (errorArray.includes("name")) {
                  setNameError(data.error.name["msg"]);
                } else {
                  setNameError(false);
                }

                if (errorArray.includes("email")) {
                  setEmailError(data.error.email["msg"]);
                } else {
                  setEmailError(false);
                }

                if (errorArray.includes("password")) {
                  setPasswordError(data.error.password["msg"]);
                } else {
                  setPasswordError(false);
                }

                if (data.error.msg) {
                  setDefaultError(data.error.msg);
                } else {
                  setDefaultError(false);
                }

                setFormSubmit(false);
              }
            })
            .catch((err) => console.log(err));
        } else {
          setDefaultError("Password not match!");
          setFormSubmit(false);
        }
      } else {
        setFormSubmit(false);
      }
    }, 1000);
  };

  return (
    <div className={classes.signUpForm}>
      <form onSubmit={signInSubmit} encType="multipart/form-data">
        <div
          className={`${classes.inputEmail} ${
            nameError && classes.inputBoxError
          }`}
        >
          <i className="fal fa-user"></i>
          <TextInput
            name="name"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {nameError && <p className="inputErrorMsg">{nameError}!</p>}
        </div>
        <div
          className={`${classes.inputEmail} ${
            emailError && classes.inputBoxError
          }`}
        >
          <i className="fad fa-envelope"></i>
          <TextInput
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="inputErrorMsg">{emailError}!</p>}
        </div>
        <div
          className={`${classes.inputEmail} ${
            mobileNumberError && classes.inputBoxError
          }`}
        >
          <i className="fal fa-phone"></i>
          <TextInput
            name="number"
            type="text"
            placeholder="Mobile No"
            value={mobileNum}
            onChange={(e) => setMobileNum(e.target.value)}
          />
          {mobileNumberError && (
            <p className="inputErrorMsg">{mobileNumberError}!</p>
          )}
        </div>
        <div
          className={`${classes.inputPassword} ${
            passwordError && classes.inputBoxError
          }`}
        >
          <i className="fad fa-lock"></i>
          <TextInput
            name="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="inputErrorMsg">{passwordError}!</p>}
        </div>
        <div
          className={`${classes.inputPassword} ${
            passwordError && classes.inputBoxError
          }`}
        >
          <i className="fad fa-lock"></i>
          <TextInput
            name="cpassword"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && <p className="inputErrorMsg">{passwordError}!</p>}
        </div>
        <div className={classes.googleRecaptcha}>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
            onChange={reCaptchaVerify}
          />
        </div>

        {defaultError && (
          <div className="errorMessage">
            <p>{defaultError}</p>
          </div>
        )}

        <div className={classes.signUpSubmitBtn}>
          {formSubmit && (
            <Button disabled={true}>
              <i className="fas fa-spinner fa-spin"></i> Sign Up...
            </Button>
          )}
          {!formSubmit && <Button type="submit">Sign Up</Button>}
        </div>
      </form>
      <div className={classes.needAndAccountDiv}>
        <p>
          If you have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
