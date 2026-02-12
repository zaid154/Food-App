import { useState } from "react";
import { LOGO } from "./../utils/Constants";

const Header = () => {

  const [loginbtn, setLoginbtn] = useState("Login");

  const btnchange = () => {
    if (loginbtn === "Login") {
      setLoginbtn("Logout");
    } else {
      setLoginbtn("Login");
    }
  };

  

  const [inputdata, setinputdata] = useState("");

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
          <input
            type="text"
            placeholder=" Search Here"
            id="search_bar"
            value={inputdata}
            onChange={"a"}
          />

          <select id="category">
            <option value="">Select category</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="sweet">Vegan</option>
          </select>

          <li className="home">Home</li>
          <li className="about_us">About Us</li>
          <li className="Contact_us">Contact Us</li>
          <li className="Cart_con">Cart</li>

          <li className="log_in" onClick={btnchange}>
            {loginbtn}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
