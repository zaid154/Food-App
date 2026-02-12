import { useEffect, useState } from "react";
import product from "../utils/Product";
import Shimmer from "./shimmer";

const CardHandler = ({ data }) => {
  // console.log(data);

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
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://dummyjson.com/recipes");
      const jsondata = await data.json();

      setProducts(jsondata.recipes);
      setAllProducts(jsondata.recipes);
    };

    fetchData();
  }, []);

  function topRatedFood() {
    const filterProducts = allProducts.filter(
      (product) => product.rating >= 4.7,
    );
    setProducts(filterProducts);
  }

  function priceFood() {
    const filterProducts = allProducts.filter(
      (product) => product.caloriesPerServing >= 500,
    );
    setProducts(filterProducts);
  }

  return (
    <>
      {products.length === 0 ? (
        <Shimmer />
      ) : (
        <>
          <div className="topbtn">
            <button className="top_rated" onClick={topRatedFood}>
              Top Rated Food
            </button>

            <button className="top_price" onClick={priceFood}>
              Price Rated Food
            </button>
          </div>

          <div className="cart-list">
            {products.map((item) => (
              <CardHandler data={item} key={item.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Card;
