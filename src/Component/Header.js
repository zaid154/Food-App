import { useState } from "react";
import { LOGO } from "./../utils/Constants";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";

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

  const cartItem=useSelector((data)=>data.cart.item)
  console.log("items",cartItem);


  return (
    <div className="flex justify-between m-1 p-2 border-2">
      <div className="logo w-15">
        <img
          src={LOGO}
          alt="logo"
          style={{ paddingLeft: "0px", margin: "0" }}
        />
      </div>

      <div className="flex gap-1 p-4 list-none font-bold items-center justify-center">
        <ul className="flex space-x-9">
          <li><Link to="/">Is online {status ? "🟢" : "🔴"}</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/grocery">Grocery</Link></li>
          <li><Link to="/About">About Us</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
          <li><Link to="/Cart">Cart : {cartItem.length}</Link></li>
          <li className="log_in" onClick={btnchange}>
            {loginbtn}
          </li>
          <button onClick={() => {
            document.body.classList.toggle("dark");
          }} className="bg-gray-700 text-white px-4 rounded-2xl h-5 text-sm ">
            Dark Mode
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
