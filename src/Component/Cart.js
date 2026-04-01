import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useResipe from "./useRecipes";
import Cartwithdifficulty from "./Cartwithdifficulty.js";


const CardHandler = ({ data }) => {
  return (
    <div className="flex flex-col m-0 p-2 border rounded w-55 h-[420]">

      <img
        src={data.image}
        alt={data.name}
        className="object-cover rounded"
      />

      <div className="res-detail flex flex-col">

        <p className="text-[16px] font-bold mt-2">{data.name}</p>

        <p className="font-bold text-md mt-1  text-center">Ingredients</p>
        <p className="text-[13px]  mb-3 line-clamp-3">
          {data.ingredients.join(", ")}
        </p>

        <div className="flex justify-between align-items-center mt-auto mb-2">
          <span>₹{data.caloriesPerServing}</span>
          <span>{data.rating} ⭐</span>
        </div>

        <div className="flex gap-4 mt-auto">
          <button className="bg-pink-400 rounded w-full ">
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

const CartwithdifficultyS = Cartwithdifficulty(CardHandler);

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
      <div className="flex gap-4 m-4 justify-center space-x-4">
        <button className="bg-green-500 text-white h-10 px-4 rounded" onClick={topRatedFood}>
          Top Rated Food
        </button>
        <button className="bg-blue-500 text-white h-10 px-4 rounded" onClick={priceFood}>
          Price Rated Food
        </button>

      </div>

      <div className=" h-10 m-4 flex items-center justify-center rounded">
        <input
          className="h-8 w-full max-w-xl px-4 rounded border border-gray-500"
          type="text"
          placeholder=" Search Here"
          id="search_bar"
          value={inputdata}
          onChange={(e) => inputfunction(e.target.value)}
        />
        <button onClick={clickfunction} className="bg-red-500 text-white h-8 px-4 rounded ml-4">
          Search
        </button>
      </div>

      {products.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="grid grid-cols-5 gap-3 relative px-2">
          {products.map((item) => (
            <Link to={`restaurant/${item.id}`} key={item.id}>
              <CartwithdifficultyS data={item} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Card;







