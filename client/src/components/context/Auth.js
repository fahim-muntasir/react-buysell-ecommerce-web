import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [cardItem, setCardItem] = useState(
    localStorage.getItem("bs_ci")
      ? JSON.parse(localStorage.getItem("bs_ci")).length
      : 0
  );

  const signin = (data = {}, cd) => {
    fetch("http://localhost:3030/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          cd(result);
        } else {
          setIsLogin(true);
          cd(result);
        }
      })
      .catch((err) => cd({ error: "Login faild!" }));
  };

  const checkLogin = (cd = () => {}) => {
    const token = localStorage.getItem(process.env.REACT_APP_LOCAL_VALUE_NAME);
    fetch("http://localhost:3030/checklogin", {
      method: "POST",
      body: JSON.stringify({ tokenId: token }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          setIsLogin(result.loginInfo);
          cd(result);
        } else {
          setIsLogin(false);
          cd(result.error);
        }
      });
  };

  const logout = (cd = () => {}) => {
    const token = localStorage.getItem(process.env.REACT_APP_LOCAL_VALUE_NAME);
    if (token) {
      localStorage.removeItem(process.env.REACT_APP_LOCAL_VALUE_NAME);
      setIsLogin(false);
    } else {
      fetch("http://localhost:3030/logout", {
        method: "POST",
        credentials: "include",
      }).then((result) => {
        setIsLogin(false);
        cd(result);
      });
    }
  };

  const addProduct = (data, cd) => {
    fetch("http://localhost:3030/addproduct", {
      method: "POST",
      body: data,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => cd(result))
      .catch((err) => cd(err));
  };

  const cardItemCount = () => {
    setCardItem(
      localStorage.getItem("bs_ci")
        ? JSON.parse(localStorage.getItem("bs_ci")).length
        : 0
    );
  };

  const value = {
    signin,
    isLogin,
    checkLogin,
    logout,
    addProduct,
    cardItemCount,
    cardItem,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
