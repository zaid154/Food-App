import { useEffect, useState, useContext } from "react";
import UserContext from "./Usercontext";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useResipe from "./useRecipes";
import Cartwithdifficulty from "./Cartwithdifficulty";
import { useDispatch } from "react-redux";
import { addCart } from "../utils/cartSlice";


const CardHandler = ({ data }) => {

  const { name, image, ingredients, caloriesPerServing, rating } = data;

  const shortName = name.split(" ").slice(0, 3).join(" ");
  const userContext = useContext(UserContext);
  const dispatch = useDispatch();

  const cartHandler = (item) => {
    dispatch(addCart(item));
    console.log("Added item:", item);
  };

  return (
    <div className="flex flex-col p-2 border rounded w-55 h-[420px]">

      {/* Image */}
      <img
        src={image}
        alt={name}
        className="object-cover rounded"
      />

      <div className="flex flex-col flex-grow">

        {/* Name */}
        <p className="font-bold mt-2 text-mid">
          {shortName}
          {name.split(" ").length > 3 && "..."}
        </p>

        {/* Ingredients */}
        <p className="font-bold text-md mt-1 text-center">
          Ingredients
        </p>

        <p className="text-[13px] mb-3 line-clamp-3">
          {ingredients.join(", ")}
        </p>

        {/* Price + Rating */}
        <div className="flex justify-between mt-auto mb-2">
          <span>₹{caloriesPerServing}</span>
          <span>{rating} ⭐</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            className="border border-gray-400 text-gray-700 h-8 w-full rounded hover:bg-gray-100 transition"
            onClick={() => cartHandler(data)}
          >
            Add to cart
          </button>

          <button className="bg-black text-white h-8 w-full rounded hover:bg-gray-900 transition">
            Buy now
          </button>

        </div>
      </div>
    </div>
  );
};


// ✅ HOC
const CardWithDifficulty = Cartwithdifficulty(CardHandler);


// ✅ Main Component
const Card = () => {

  const [products, setProducts] = useState([]);
  const [finalProducts, setFinalProducts] = useState([]);
  const [inputData, setInputData] = useState("");

  const jsondata = useResipe();

  // API data load
  useEffect(() => {
    if (jsondata?.recipes) {
      setProducts(jsondata.recipes);
      setFinalProducts(jsondata.recipes);
    }
  }, [jsondata]);

  // Top Rated Filter
  const topRatedFood = () => {
    const filtered = finalProducts.filter(
      (p) => p.rating >= 4.7
    );
    setProducts(filtered);
  };

  // High Calories Filter
  const priceFood = () => {
    const filtered = finalProducts.filter(
      (p) => p.caloriesPerServing >= 500
    );
    setProducts(filtered);
  };

  // Search
  const searchFood = () => {
    const filtered = finalProducts.filter((p) =>
      p.name.toLowerCase().includes(inputData.toLowerCase())
    );
    setProducts(filtered);
  };

  return (
    <>
      {/* Buttons */}
      <div className="flex gap-4 m-4 justify-center">
        <button
          className="bg-green-500 text-white h-10 px-4 rounded"
          onClick={topRatedFood}
        >
          Top Rated
        </button>

        <button
          className="bg-blue-500 text-white h-10 px-4 rounded"
          onClick={priceFood}
        >
          High Calories
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-center m-4">

        <input
          className="h-8 w-full max-w-xl px-4 border rounded"
          type="text"
          placeholder="Search..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />

        <button
          onClick={searchFood}
          className="bg-red-500 text-white h-8 px-4 rounded ml-4"
        >
          Search
        </button>

      </div>

      {/* Cards */}
      {products.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap justify-center gap-4 px-2">
          {products.map((item) => (
            <Link
              to={`restaurant/${item.id}`}
              key={item.id}
            >
              <CardWithDifficulty data={item} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Card;