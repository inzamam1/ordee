import React from "react";
import { Link } from "react-router-dom";
import "./Home_Page.css";
import { db, auth } from "./firebase";
import "./Admin.css";

function admin() {
  return (
    <div>
      <nav className="navbar">
        <Link className="navicon" to="/">
          <div>
            <img className="navicon" src={"./ordee2.png"} alt="" />
          </div>
          <Link className="usericon" to="/">
            <div>
              <img
                className="user_icon"
                src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png"
                alt=""
                onClick={() => auth.signOut()}
              />
            </div>
          </Link>
        </Link>
      </nav>
      <div className="Admin__Title">
        <h1>Hey Palash,Admin features to be added soon....</h1>
      </div>
    </div>
  );
}

export default admin;