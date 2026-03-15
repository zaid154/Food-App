import { useState } from "react";
import { LOGO } from "./../utils/Constants";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";


const Header = () => {

  const [loginbtn, setLoginbtn] = useState("Login");
  const status = useOnline()
  const btnchange = () => {
    if (loginbtn === "Login") {
      setLoginbtn("Logout");
    } else {
      setLoginbtn("Login");
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <img
          src={LOGO}
          alt="logo"
          style={{ paddingLeft: "0px", margin: "0" }}
        />
      </div>

      <div className="list">
        <ul>
          <li><Link to="/">Is online {status ? "🟢" : "🔴"}</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/grocery">Grocery</Link></li>
          <li><Link to="/About">About Us</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
          <li><Link to="/Cart">Cart</Link></li>
          <li className="log_in" onClick={btnchange}>
            {loginbtn}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
