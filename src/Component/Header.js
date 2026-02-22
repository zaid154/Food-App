import { useState } from "react";
import { LOGO } from "./../utils/Constants";
import { Link } from "react-router-dom";


const Header = () => {

  const [loginbtn, setLoginbtn] = useState("Login");

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
          <li className="home"><Link to="./">Home</Link></li>
          <li className="about_us"><Link to="./About">About Us</Link></li>
          <li className="Contact_us"><Link to="./Contact">Contact Us</Link></li>
          <li className="Cart_con"><Link to="./Cart">Cart</Link></li>
          <li className="log_in" onClick={btnchange}>
            {loginbtn}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
