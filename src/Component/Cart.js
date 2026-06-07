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

  // check if this recipe is already liked
  const wishlistItems = useSelector((store) => store.wishlist.item);
  const isLiked = wishlistItems.some((i) => i.id === data.id);

  // check if this recipe is already in the cart and how many
  const cartItems = useSelector((store) => store.cart.item);
  const inCart = cartItems.find((i) => i.id === data.id);
  const cartQty = inCart ? inCart.quantity : 0;

  const cartHandler = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addCart(item));
  };

  // decrease quantity (called by the - button)
  const minusHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeCart(data.id));
  };

  // BUY NOW — just this one product, do NOT touch the cart.
  // we pass the product to /checkout using router state.
  // checkout page will read it and show only this item.
  const buyNowHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/checkout", { state: { buyNowItem: data } });
  };

  // toggle like / unlike when heart is clicked
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
      {/* image with heart, rating and cuisine tag */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* heart button (top-left) */}
        <button
          onClick={likeHandler}
          aria-label="Like recipe"
          className="absolute left-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-lg shadow hover:scale-110"
        >
          {isLiked ? "❤️" : "🤍"}
        </button>

        {/* rating badge (top-right) */}
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-amber-700 shadow">
          ★ {rating}
        </span>

        {/* cuisine tag at the bottom of the image */}
        {data.cuisine && (
          <span className="absolute bottom-2 left-2 rounded-full bg-slate-900/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {data.cuisine}
          </span>
        )}
      </div>

      {/* card body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-bold leading-tight text-slate-900">
          {shortName}
          {name.split(" ").length > 3 && "..."}
        </h3>

        <p className="line-clamp-2 text-xs leading-5 text-slate-500">
          {ingredients.join(", ")}
        </p>

        {/* price + ingredients count */}
        <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xl font-extrabold text-slate-900">
            ₹{caloriesPerServing}
          </span>
          <span className="text-xs text-slate-500">
            {ingredients.length} ingredients
          </span>
        </div>

        {/* buttons stacked vertically so each one has full width */}
        <div className="mt-3 flex flex-col gap-2">

          {/* row 1 — add to cart OR quantity stepper */}
          {cartQty === 0 ? (
            <button
              className="w-full rounded-lg border border-slate-300 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
              onClick={(e) => cartHandler(e, data)}
            >
              + Add to cart
            </button>
          ) : (
            <div className="flex w-full items-center justify-between rounded-lg border border-green-400 bg-green-50 px-2 py-1">
              <button
                onClick={minusHandler}
                className="h-7 w-7 rounded-md bg-white text-base font-bold text-green-700 shadow-sm hover:bg-green-100"
              >
                −
              </button>
              <span className="text-xs font-bold text-green-700">
                In cart · {cartQty}
              </span>
              <button
                onClick={(e) => cartHandler(e, data)}
                className="h-7 w-7 rounded-md bg-white text-base font-bold text-green-700 shadow-sm hover:bg-green-100"
              >
                +
              </button>
            </div>
          )}

          {/* row 2 — buy now (adds to cart and jumps to checkout) */}
          <button
            onClick={buyNowHandler}
            className="w-full rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            Buy now →
          </button>
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
    <section className="bg-gradient-to-b from-orange-50/60 via-white to-white">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 pb-2 pt-8 md:pt-12">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
              Tasty picks for you
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Find your next favorite meal
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
              Search by dish, cuisine, or ingredient — fresh recipes updated daily.
            </p>
          </div>

          <div className="flex w-full items-center gap-2 md:w-auto">
            <div className="relative w-full md:w-80">
              <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-3.5-3.5" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes, cuisines, ingredients..."
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeFilter === f.key
                  ? "bg-slate-900 text-white shadow"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-orange-300"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto self-center text-xs text-slate-500">
            {allRecipes.length ? `${products.length} of ${allRecipes.length} recipes` : ""}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6">
        {allRecipes.length === 0 ? (
          <Shimmer />
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-base font-semibold text-slate-700">No recipes match your search.</p>
            <p className="mt-1 text-sm text-slate-500">Try a different keyword or clear the filters.</p>
            <button
              onClick={() => {
                setQuery("");
                setActiveFilter("all");
              }}
              className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
