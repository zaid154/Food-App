import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useResipe from "./useRecipes"

const CardHandler = ({ data }) => {
  return (
    <div className="flex flex-col m-3 p-3 border rounded-lg w-60 shadow-lg h-[450px]">

      <img
        src={data.image}
        alt={data.name}
        className="w-full h-52 object-cover rounded"
      />

      <div className="res-detail flex flex-col flex-grow">

        <h5 className="text-lg font-semibold mt-2">{data.name}</h5>

        <p className="font-bold text-sm mt-1">Ingredients</p>
        <p class="text-[14px] text-[#555] mb-3 whitespace-nowrap overflow-hidden text-ellipsis">
          {data.ingredients}
        </p>

        <div className="flex justify-between ">
          <span>₹{data.caloriesPerServing}</span>
          <span>{data.rating} ⭐</span>
        </div>

        <div className="flex gap-4 mt-auto">
          <button className="bg-pink-400 rounded w-full">
            Add to cart
          </button>

          <button className="bg-green-500 rounded w-full">
            Buy now
          </button>
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
    console.log(e);

  }

  useEffect(() => {
    if (jsondata && jsondata.recipes) {
      setProducts(jsondata.recipes);
      setfinalproducts(jsondata.recipes);
      console.log("cat ker data lod");

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
        <div className="grid grid-cols-5 gap-6">
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