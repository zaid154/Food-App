import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useResipe from "./useRecipes"

const CardHandler = ({ data }) => {
  return (
    <div className="cart">
      <div
        className="cart-img"
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      ></div>

      <div className="res-detail">
        <h5 style={{ marginBottom: "10px", fontSize: "18px" }}>{data.name}</h5>
        <p style={{ fontWeight: "900", fontSize: "14px" }}>Ingredients</p>
        <p className="dec">{data.ingredients}</p>

        <div className="price_rating" style={{ marginTop: "15px" }}>
          <span>₹{data.caloriesPerServing}</span>
          <span>{data.rating} ⭐</span>
        </div>

        <div className="btn_box">
          <button id="add_cart">Add to cart</button>
          <button id="buy_now">Buy now</button>
        </div>
      </div>
    </div>
  );
};

const Card = () => {
  const [products, setProducts] = useState([]);
  const [finalproducts, setfinalproducts] = useState([]);
  const [inputdata, setinputdata] = useState("");
  const jsondata = useResipe();

  function inputfunction(e) {
    setinputdata(e);
  }

  useEffect(() => {
    if (jsondata && jsondata.recipes) {
      setProducts(jsondata.recipes);
      setfinalproducts(jsondata.recipes);
    }
  }, [jsondata]);

  function topRatedFood() {
    const filterProducts = finalproducts.filter(
      (product) => product.rating >= 4.7
    );
    setProducts(filterProducts);
  }

  function priceFood() {
    const filterProducts = finalproducts.filter(
      (product) => product.caloriesPerServing >= 500
    );
    setProducts(filterProducts);
  }

  function clickfunction() {
    const filterData = finalproducts.filter((card) => {
      return card.name.toLowerCase().includes(inputdata.toLowerCase());
    });
    setProducts(filterData);
  }

  return (
    <>
      <div className="topbtn">
        <button className="top_rated" onClick={topRatedFood}>
          Top Rated Food
        </button>
        <button className="top_price" onClick={priceFood}>
          Price Rated Food
        </button>
      </div>

      <div className="searchdiv">
        <input
          type="text"
          placeholder=" Search Here"
          id="search_bar"
          value={inputdata}
          onChange={(e) => inputfunction(e.target.value)}
        />
        <button onClick={clickfunction} className="serbtn">
          Search
        </button>
      </div>

      {products.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="cart-list">
          {products.map((item) => (
            <Link to={`restaurant/${item.id}`} key={item.id}>
              <CardHandler data={item} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Card;