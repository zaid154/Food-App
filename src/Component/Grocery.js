import Shimmer from "./Shimmer.js";
import usegroceries from "./Usegroceries";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart, removeCart } from "../utils/cartSlice";
import { addWishlist, removeWishlist } from "../utils/wishlistSlice";

// map grocery fields to the shape cart/wishlist use, "g" prefix avoids id clash
const toCommonItem = (p) => ({
    id: "g" + p.id,
    name: p.title,
    image: p.thumbnail,
    caloriesPerServing: p.price,
    cuisine: p.category,
    ingredients: p.description ? [p.description] : [],
    rating: p.rating
});

const GroceryCard = ({ p }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const item = toCommonItem(p);

    const cartItems = useSelector((store) => store.cart.item);
    const wishlistItems = useSelector((store) => store.wishlist.item);

    const inCart = cartItems.find((c) => c.id === item.id);
    const cartQty = inCart ? inCart.quantity : 0;
    const isLiked = wishlistItems.some((w) => w.id === item.id);

    const addHandler = () => dispatch(addCart(item));
    const minusHandler = () => dispatch(removeCart(item.id));

    const likeHandler = () => {
        if (isLiked) {
            dispatch(removeWishlist(item.id));
        } else {
            dispatch(addWishlist(item));
        }
    };

    const buyNowHandler = () => {
        navigate("/checkout", { state: { buyNowItem: item } });
    };

    const titleWords = p.title.split(" ");

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="relative bg-gray-50">
                <img
                    src={p.thumbnail}
                    alt={p.title}
                    loading="lazy"
                    className="h-44 w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                />

                <button
                    onClick={likeHandler}
                    aria-label="Like product"
                    className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow hover:scale-110"
                >
                    {isLiked ? "❤️" : "🤍"}
                </button>

                {p.discountPercentage > 0 && (
                    <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        -{Math.round(p.discountPercentage)}%
                    </span>
                )}

                {p.category && (
                    <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
                        {p.category}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-base font-bold leading-tight text-gray-900">
                    {titleWords.slice(0, 4).join(" ")}
                    {titleWords.length > 4 && "..."}
                </h3>
                <p className="line-clamp-2 text-xs leading-5 text-gray-500">
                    {p.description}
                </p>

                <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-lg font-bold text-gray-900">₹{p.price}</span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-green-600 px-1.5 py-0.5 text-xs font-bold text-white">
                        {p.rating} ★
                    </span>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                    {cartQty === 0 ? (
                        <button
                            onClick={addHandler}
                            className="w-full rounded-md border border-red-600 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                            ADD
                        </button>
                    ) : (
                        <div className="flex w-full items-center justify-between rounded-md border border-red-400 bg-red-50 px-2 py-1">
                            <button
                                onClick={minusHandler}
                                className="h-7 w-7 rounded-md bg-white text-base font-bold text-red-600 shadow-sm hover:bg-red-100"
                            >
                                −
                            </button>
                            <span className="text-xs font-bold text-red-600">
                                In cart · {cartQty}
                            </span>
                            <button
                                onClick={addHandler}
                                className="h-7 w-7 rounded-md bg-white text-base font-bold text-red-600 shadow-sm hover:bg-red-100"
                            >
                                +
                            </button>
                        </div>
                    )}

                    <button
                        onClick={buyNowHandler}
                        className="w-full rounded-md bg-red-600 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                    >
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    );
};

const Grocery = () => {
    const Grocery_data = usegroceries();
    const [query, setQuery] = useState("");

    const products = useMemo(() => {
        if (!Grocery_data?.products) return [];
        const q = query.trim().toLowerCase();
        if (!q) return Grocery_data.products;
        return Grocery_data.products.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q) ||
                p.brand?.toLowerCase().includes(q)
        );
    }, [Grocery_data, query]);

    if (!Grocery_data) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-8">
                <Shimmer />
            </section>
        );
    }

    return (
        <section className="bg-white">
            <div className="border-b border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                            Grocery
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
                                placeholder="Search products..."
                                className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-red-400"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="text-sm font-bold text-gray-900">
                    {products.length} product{products.length !== 1 ? "s" : ""}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((p) => (
                        <GroceryCard key={p.id} p={p} />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                        <p className="text-base font-semibold text-slate-700">No products match your search.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Grocery;
