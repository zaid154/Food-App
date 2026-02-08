import { LOGO } from "./../utils/Constants";

const Header = () => {
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
            placeholder=" Search Heare"
            id="search_bar"
          ></input>
          <select id="category">
            <option value="">Select category</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="sweet">Sweet</option>
          </select>

          <li className="home">Home</li>
          <li className="about_us">About Us</li>
          <li className="Contact_us">Contact Us</li>
          <li className="Cart_con">Cart</li>
        </ul>
      </div>

    </div>
  );
};

export default Header;




