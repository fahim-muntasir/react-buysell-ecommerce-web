import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "../styles/Navbar.module.css";
import Button from "./Button";
import { useAuth } from "./context/Auth";
import SignInCard from "./SignInCard";
import UserControllInfo from "./UserControll";

export default function Navbar({ isShowLoginCard }) {
  const [isSignInCard, setIsSignInCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userControllerInfo, setUserControllerInfo] = useState(false);

  const { isLogin, checkLogin, cardItem } = useAuth();

  useEffect(() => {
    checkLogin(() => {
      setLoading(true);
    });
  }, []);

  const showSignInCard = () => {
    setIsSignInCard(true);
  };

  const hideSignInCard = () => {
    setIsSignInCard(false);
  };

  return (
    <header className={classes.topHeader}>
      <div className="container">
        <nav>
          <div className={classes.navBrand}>
            <h1>
              <Link to="/">BS</Link>
            </h1>
          </div>
          <div className={classes.searchBarHeader}>
            <input type="text" placeholder="Search..." />
            <i className="fal fa-search"></i>
          </div>
          <div className={classes.navItem}>
            <div className={classes.cardTop}>
              <Link to="/card">
                <i className="fal fa-cart-arrow-down"></i>
              </Link>
              {cardItem > 0 ? (
                <span className={classes.cardItemCount}>{cardItem}</span>
              ) : null}
            </div>
            {loading && (
              <>
                {!isLogin && (
                  <div className={classes.accountAction}>
                    <Link to="/signin">
                      <Button
                        onMouseOver={isShowLoginCard && showSignInCard}
                        className={classes.signInBtnTop}
                        type="button"
                      >
                        Sign in
                      </Button>
                    </Link>
                    {isSignInCard && (
                      <SignInCard onMouseLeave={hideSignInCard} />
                    )}
                  </div>
                )}

                {isLogin && (
                  <div
                    className={classes.userControll}
                    onClick={() => setUserControllerInfo(!userControllerInfo)}
                  >
                    <i className="fal fa-user"></i>
                    <span>{isLogin.name}</span>
                    {userControllerInfo && <UserControllInfo />}
                  </div>
                )}
              </>
            )}

            <div className={classes.productSellBtnTop}>
              <Link to="/sellproduct">
                <Button className={classes.sellBtnTop} type="button">
                  Sell Now
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
