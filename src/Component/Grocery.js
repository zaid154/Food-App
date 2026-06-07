import Shimmer from "./Shimmer.js";
import usegroceries from "./Usegroceries";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCart, removeCart } from "../utils/cartSlice";
import { addWishlist, removeWishlist } from "../utils/wishlistSlice";

// grocery products use different field names than recipes (title vs name,
// thumbnail vs image, price vs caloriesPerServing).
// this small helper converts a grocery product into the SAME shape
// our cart / wishlist / checkout already understand.
// we also prefix the id with "g" so it does not clash with recipe ids.
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

    // ready-to-use item in the format the rest of the app uses
    const item = toCommonItem(p);

    // read cart + wishlist from redux to update this card's UI
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

    // buy now — send just this product to checkout (does NOT touch the cart)
    const buyNowHandler = () => {
        navigate("/checkout", { state: { buyNowItem: item } });
    };

    const titleWords = p.title.split(" ");

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative bg-slate-50">
                <img
                    src={p.thumbnail}
                    alt={p.title}
                    loading="lazy"
                    className="h-44 w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                />

                {/* like / favorite button */}
                <button
                    onClick={likeHandler}
                    aria-label="Like product"
                    className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow hover:scale-110"
                >
                    {isLiked ? "❤️" : "🤍"}
                </button>

                {/* discount badge */}
                {p.discountPercentage > 0 && (
                    <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        -{Math.round(p.discountPercentage)}%
                    </span>
                )}

                {/* category tag at the bottom */}
                {p.category && (
                    <span className="absolute bottom-2 left-2 rounded-full bg-emerald-700/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {p.category}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-base font-bold leading-tight text-slate-900">
                    {titleWords.slice(0, 4).join(" ")}
                    {titleWords.length > 4 && "..."}
                </h3>
                <p className="line-clamp-2 text-xs leading-5 text-slate-500">
                    {p.description}
                </p>

                <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-xl font-extrabold text-slate-900">₹{p.price}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        ★ {p.rating}
                    </span>
                </div>

                <div className="mt-3 flex flex-col gap-2">

                    {/* row 1 — add to cart OR quantity stepper */}
                    {cartQty === 0 ? (
                        <button
                            onClick={addHandler}
                            className="w-full rounded-lg border border-slate-300 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                            + Add to cart
                        </button>
                    ) : (
                        <div className="flex w-full items-center justify-between rounded-lg border border-emerald-400 bg-emerald-50 px-2 py-1">
                            <button
                                onClick={minusHandler}
                                className="h-7 w-7 rounded-md bg-white text-base font-bold text-emerald-700 shadow-sm hover:bg-emerald-100"
                            >
                                −
                            </button>
                            <span className="text-xs font-bold text-emerald-700">
                                In cart · {cartQty}
                            </span>
                            <button
                                onClick={addHandler}
                                className="h-7 w-7 rounded-md bg-white text-base font-bold text-emerald-700 shadow-sm hover:bg-emerald-100"
                            >
                                +
                            </button>
                        </div>
                    )}

                    {/* row 2 — buy now */}
                    <button
                        onClick={buyNowHandler}
                        className="w-full rounded-lg bg-emerald-600 py-2 text-xs font-semibold text-white transition hover:bg-emerald-500"
                    >
                        Buy now →
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
        <section className="bg-gradient-to-b from-emerald-50/40 via-white to-white">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
                            Daily essentials
                        </p>
                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                            Fresh groceries, delivered fast
                        </h1>
                        <p className="mt-2 max-w-xl text-sm text-slate-600">
                            Stock up on everyday essentials — handpicked products at honest prices.
                        </p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="7" />
                            <path strokeLinecap="round" d="M21 21l-3.5-3.5" />
                        </svg>
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm shadow-sm outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>
                </div>

                <div className="mt-3 text-xs text-slate-500">
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
