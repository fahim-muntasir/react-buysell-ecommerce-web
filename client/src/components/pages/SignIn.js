import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import SignInForm from "../SignInForm";

export default function SignIn() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

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
          <div className="signInSignUpContainer">
            <div className="signInSignUpTitle">
              <h2>Sign in</h2>
            </div>
            <SignInForm />
          </div>
        </div>
      )}
    </>
  );
}
