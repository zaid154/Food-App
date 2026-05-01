import { useState } from "react";
import { LOGO } from "./../utils/Constants";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";

const Header = () => {

  const [loginbtn, setLoginbtn] = useState("Login");
  const status = useOnline();

  const btnchange = () => {
    setLoginbtn(loginbtn === "Login" ? "Logout" : "Login");
  };

  // ✅ FIXED (clean + correct naming)
  const cartItem = useSelector((state) => state.cart.item);

  return (
    <div className="flex justify-between m-1 p-2 border border-gray-300 rounded items-center">
      
      {/* Logo */}
      <div className="logo w-15">
        <img
          src={LOGO}
          alt="logo"
          style={{ paddingLeft: "0px", margin: "0" }}
        />
      </div>

      {/* Nav */}
      <div className="flex gap-1 p-4 list-none font-bold items-center justify-center">
        <ul className="flex space-x-9">

          <li>
            <Link to="/">Is Online {status ? "🟢" : "🔴"}</Link>
          </li>

          <li><Link to="/">Home</Link></li>
          <li><Link to="/grocery">Grocery</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>

          {/* ✅ Cart Count */}
          <li>
            <Link to="/cart">
              Cart ({cartItem.length})
            </Link>
          </li>

          {/* Login Button */}
          <li className="log_in cursor-pointer" onClick={btnchange}>
            {loginbtn}
          </li>

          {/* Dark Mode */}
          <button
            onClick={() => document.body.classList.toggle("dark")}
            className="bg-gray-700 text-white px-4 rounded-2xl h-5 text-sm"
          >
            Dark Mode
          </button>

        </ul>
      </div>
    </div>
  );
};

export default Header;