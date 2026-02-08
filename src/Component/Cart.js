import { useState } from "react";
import product from "../utils/Product";


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
        <h5 style={{marginBottom:"10px" , fontSize: "18px" }}>{data.name}</h5>
        <p style={{ fontWeight: "900", fontSize: "14px" }}>Ingredients</p>

        <p>{data.detail}</p>

        <div className="price_rating" style={{ marginTop: "15px" }}>
          <span>₹{data.price}</span>
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



const Card=()=>{
  const [products,setProducts]=useState(product)
  function topRatedFood() {
    const filterProducts=products.filter(product=>product.rating>=4)
    setProducts(filterProducts)
  }

    function priceFood() {
    const filterProducts=products.filter(product=>product.price>=400)
    setProducts(filterProducts)
  }
  

  return <>
  <button className="top-rated" onClick={topRatedFood}>Top rater food</button>
  <button className="top-rated" onClick={priceFood}>Price rater food</button>
  <div className="cart-list">
        {products.map((products) => {
          return <CardHandler data={products} key={products.id} />;
        })}
      </div>
  </>

  
};






export default Card;
