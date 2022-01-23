import React from "react";
import classes from "../styles/UserControll.module.css";
import { useAuth } from "./context/Auth";

export default function UserControll() {
  const { logout } = useAuth();
  return (
    <div className={classes.userControllOption}>
      <ul>
        <li>
          <i className="fad fa-tachometer-slowest"></i> Dashboard
        </li>
        <li onClick={() => logout()}>
          <i className="fal fa-sign-out"></i> Log Out
        </li>
      </ul>
    </div>
  );
}
