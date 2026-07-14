import { useEffect, useMemo, useState, useContext } from "react";
import UserContext from "./Usercontext";
import Shimmer from "./Shimmer";
import { Link, useNavigate } from "react-router-dom";
import useResipe from "./useRecipes";
import Cartwithdifficulty from "./Cartwithdifficulty";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../utils/cartSlice";
import { addWishlist, removeWishlist } from "../utils/wishlistSlice";

const CardHandler = ({ data }) => {
  const { name, image, ingredients, caloriesPerServing, rating } = data;
  const shortName = name.split(" ").slice(0, 3).join(" ");
  useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((store) => store.wishlist.item);
  const isLiked = wishlistItems.some((i) => i.id === data.id);

  const cartItems = useSelector((store) => store.cart.item);
  const inCart = cartItems.find((i) => i.id === data.id);
  const cartQty = inCart ? inCart.quantity : 0;

  const cartHandler = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addCart(item));
  };

  const minusHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeCart(data.id));
  };

  const buyNowHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/checkout", { state: { buyNowItem: data } });
  };

  const likeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      dispatch(removeWishlist(data.id));
    } else {
      dispatch(addWishlist(data));
    }
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-[290px] w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />

        <button
          onClick={likeHandler}
          aria-label="Like recipe"
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg shadow transition hover:scale-110"
        >
          {isLiked ? "❤️" : "🤍"}
        </button>

        {data.cuisine && (
          <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold text-gray-800 shadow-sm backdrop-blur">
            {data.cuisine}
          </span>
        )}

        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-green-600 px-1.5 py-0.5 text-xs font-bold text-white shadow">
          {rating} ★
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-bold leading-tight text-gray-900">
          {shortName}
          {name.split(" ").length > 3 && "..."}
        </h3>

        <p className="line-clamp-2 text-xs leading-5 text-gray-500">
          {ingredients.join(", ")}
        </p>

        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-xl font-extrabold text-gray-900">
            ₹{caloriesPerServing}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
            {ingredients.length} items
          </span>
        </div>

        <div className="mt-3">
          {cartQty === 0 ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={(e) => cartHandler(e, data)}
                className="rounded-lg border border-red-600 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                ADD
              </button>
              <button
                onClick={buyNowHandler}
                className="rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Buy now
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center justify-between rounded-lg border border-green-500 bg-green-50 px-2 py-1.5">
                <button
                  onClick={minusHandler}
                  className="h-8 w-8 rounded-md bg-white text-lg font-bold text-green-700 shadow-sm transition hover:bg-green-100"
                >
                  −
                </button>
                <span className="text-sm font-bold text-green-700">
                  {cartQty} in cart
                </span>
                <button
                  onClick={(e) => cartHandler(e, data)}
                  className="h-8 w-8 rounded-md bg-white text-lg font-bold text-green-700 shadow-sm transition hover:bg-green-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={buyNowHandler}
                className="w-full rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Buy now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CardWithDifficulty = Cartwithdifficulty(CardHandler);

const Card = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const jsondata = useResipe();

  useEffect(() => {
    if (jsondata?.recipes) {
      setAllRecipes(jsondata.recipes);
    }
  }, [jsondata]);

  const products = useMemo(() => {
    let list = allRecipes;
    if (activeFilter === "top") list = list.filter((p) => p.rating >= 4.7);
    if (activeFilter === "calories") list = list.filter((p) => p.caloriesPerServing >= 500);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.cuisine?.toLowerCase().includes(q) ||
          p.ingredients?.some((i) => i.toLowerCase().includes(q))
      );
    }
    return list;
  }, [allRecipes, activeFilter, query]);

  const filters = [
    { key: "all", label: "All" },
    { key: "top", label: "Top Rated" },
    { key: "calories", label: "High Calories" }
  ];

  return (
    <section className="bg-white">
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-[1600px] px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              Order food online
            </h1>
            <div className="relative w-full md:w-96">
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for dishes, cuisines..."
                className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-red-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 pt-6">
        <div className="flex items-center justify-between">
          {allRecipes.length ? (
            <h2 className="text-lg font-bold text-gray-900">
              {products.length} dishes
            </h2>
          ) : (
            <div className="skeleton h-6 w-28 rounded-full" />
          )}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                  activeFilter === f.key
                    ? "border-red-600 bg-red-50 text-red-600"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 pb-12 pt-6">
        {allRecipes.length === 0 ? (
          <Shimmer />
        ) : products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="text-base font-semibold text-gray-700">No recipes match your search.</p>
            <p className="mt-1 text-sm text-gray-500">Try a different keyword or clear the filters.</p>
            <button
              onClick={() => {
                setQuery("");
                setActiveFilter("all");
              }}
              className="mt-4 rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {products.map((item) => (
              <Link to={`restaurant/${item.id}`} key={item.id} className="block">
                <CardWithDifficulty data={item} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Card;
