import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import classes from "../styles/SignInCard.module.css";
import Button from "./Button";
import { useAuth } from "./context/Auth";
import TextInput from "./TextInput";

export default function SignInCard({ ...rest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [defaultError, setDefaultError] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  const { signin } = useAuth();
  const navigate = useNavigate();

  const signinFormHandlear = (e) => {
    e.preventDefault();
    setFormSubmit(true);
    setTimeout(() => {
      if (email && password) {
        setDefaultError(false);
        signin({ email, password }, (result) => {
          if (!result.error) {
            setEmail("");
            setPassword("");
            setFormSubmit(false);
            navigate("/");
          } else {
            setDefaultError(result.error.msg);
            setFormSubmit(false);
          }
        });
      } else {
        setDefaultError("Every fild is required!");
        setFormSubmit(false);
      }
    }, 1000);
  };

  const responseGoogle = (response) => {
    fetch("http://localhost:3030/google/signup", {
      method: "POST",
      body: JSON.stringify({ token: response.tokenId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem(
          process.env.REACT_APP_LOCAL_VALUE_NAME,
          response.tokenId
        );
        navigate("/");
      });
  };

  return (
    <div {...rest} className={classes.signIpCard}>
      <h4>Sign In</h4>
      <form onSubmit={signinFormHandlear}>
        <div className={`${classes.signUpInput} ${classes.emailfild}`}>
          <i className="fad fa-envelope"></i>
          <TextInput
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.signUpInput}>
          <i className="fad fa-lock"></i>
          <TextInput
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a className={classes.forgotPassword} href="$">
          Forgot password
        </a>
        {defaultError && (
          <div className="errorMessage">
            <p>{defaultError}</p>
          </div>
        )}
        <div className={classes.googleAndFacebookBtn}>
          <Button type="button">
            <i className="fab fa-facebook-f"></i> Facebook
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <i className="fab fa-google"></i> Google
              </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        {formSubmit && (
          <Button className={classes.signInSubmitBtn} disabled={true}>
            <i className="fas fa-spinner fa-spin"></i> Sign In...
          </Button>
        )}
        {!formSubmit && (
          <Button className={classes.signInSubmitBtn} type="submit">
            Sign In
          </Button>
        )}
      </form>
    </div>
  );
}
