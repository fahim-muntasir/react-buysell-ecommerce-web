import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import SignUpForm from "../SignUpForm";

export default function SignUp() {
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
              <h2>Sing Up</h2>
            </div>
            <SignUpForm />
          </div>
        </div>
      )}
    </>
  );
}
