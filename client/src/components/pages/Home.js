import React, { useEffect, useState } from "react";
import bannerImage from "../../assets/img/banner.png";
import classes from "../../styles/Home.module.css";
import Navbar from "../Navbar";
import ProductCatagorys from "../ProductCatagorys";
// import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const myStyle = {
    background:
      "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0px, rgb(0 0 0 / 52%) 60%, rgba(0, 0, 0, 0.8) 100%)",
  };

  return (
    <>
      <Navbar isShowLoginCard={true} />
      {loading && (
        <div className="pageLoader">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}

      {!loading && (
        <>
          <div
            className={classes.homeBannerDiv}
            style={{ backgroundImage: `url(${bannerImage})` }}
          >
            <div className={classes.webBannerImage} style={myStyle}>
              <div className="container">
                <h1 className={classes.webTitleInBanner}>Buy and Sell Here</h1>
              </div>
            </div>
          </div>
          <div className="container">
            <ProductCatagorys />
          </div>
          {/* <MessengerCustomerChat
            pageId={process.env.REACT_APP_PAGE_ID}
            appId={process.env.REACT_APP_ID}
          /> */}
        </>
      )}
    </>
  );
}
