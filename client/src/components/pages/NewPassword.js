import React, { useEffect, useState } from "react";
import NewPasswordForm from "../NewPasswordForm";

export default function SignIn() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <>
      {loading && (
        <div className="pageLoader">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}

      {!loading && (
        <div className="container">
          <div className="signInSignUpContainer">
            <div className="signInSignUpTitle">
              <h2>Set new password</h2>
            </div>
            <NewPasswordForm />
          </div>
        </div>
      )}
    </>
  );
}
