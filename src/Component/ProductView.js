import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InstructionsView from "./InstructionsView";
import useResipe from "./useRecipes";
import Shimmer from "./Shimmer";
import { addCart, removeCart } from "../utils/cartSlice";
import { addWishlist, removeWishlist } from "../utils/wishlistSlice";

const ProductView = () => {
    const { id } = useParams();
    const data = useResipe();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openStep, setOpenStep] = useState(null);

    // keep selectors above the early return so hook order stays stable
    const cartItems = useSelector((store) => store.cart.item);
    const wishlistItems = useSelector((store) => store.wishlist.item);

    if (!data) return <Shimmer />;

    const product = data.recipes.find((item) => item.id == id);

    if (!product) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-slate-900">Recipe not found</h1>
                <Link
                    to="/"
                    className="mt-4 inline-block rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
                >
                    Back to home
                </Link>
            </div>
        );
    }

    const inCart = cartItems.find((i) => i.id === product.id);
    const cartQty = inCart ? inCart.quantity : 0;
    const isLiked = wishlistItems.some((i) => i.id === product.id);

    const handleToggle = (index) => {
        setOpenStep((prev) => (prev === index ? null : index));
    };

    const handleAddToCart = () => {
        dispatch(addCart(product));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeCart(product.id));
    };

    const handleBuyNow = () => {
        navigate("/checkout", { state: { buyNowItem: product } });
    };

    const handleLike = () => {
        if (isLiked) {
            dispatch(removeWishlist(product.id));
        } else {
            dispatch(addWishlist(product));
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
                <nav className="mb-6 text-sm text-slate-500">
                    <Link to="/" className="hover:text-red-600">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-slate-700">{product.name}</span>
                </nav>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />

                        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-md bg-green-600 px-2.5 py-1 text-sm font-bold text-white shadow">
                            {product.rating} ★ ({product.reviewCount})
                        </span>

                        {product.difficulty && (
                            <span className="absolute left-4 top-14 rounded bg-black/70 px-3 py-1 text-xs font-semibold text-white shadow">
                                {product.difficulty}
                            </span>
                        )}

                        <button
                            onClick={handleLike}
                            aria-label="Save to favorites"
                            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:scale-110"
                        >
                            {isLiked ? "❤️" : "🤍"}
                        </button>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            {product.cuisine}
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                            {product.name}
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            {Array.isArray(product.mealType) ? product.mealType.join(" • ") : product.mealType}
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                                <p className="text-2xl">⏱️</p>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Cook</p>
                                <p className="text-sm font-bold text-slate-900">{product.cookTimeMinutes} min</p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                                <p className="text-2xl">🔥</p>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Calories</p>
                                <p className="text-sm font-bold text-slate-900">{product.caloriesPerServing}</p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                                <p className="text-2xl">🍽️</p>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Servings</p>
                                <p className="text-sm font-bold text-slate-900">{product.servings}</p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                                <p className="text-2xl">⭐</p>
                                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Rating</p>
                                <p className="text-sm font-bold text-slate-900">{product.rating}</p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl bg-red-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-red-700">Price</p>
                            <p className="mt-1 text-4xl font-extrabold text-slate-900">
                                ₹{product.caloriesPerServing}
                                <span className="ml-2 text-xs font-medium text-slate-500">incl. taxes</span>
                            </p>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            {cartQty === 0 ? (
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 rounded-md bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                                >
                                    Add to cart
                                </button>
                            ) : (
                                <div className="flex flex-1 items-center justify-between rounded-md border-2 border-red-400 bg-red-50 px-3 py-1">
                                    <button
                                        onClick={handleRemoveFromCart}
                                        className="h-9 w-9 rounded-md bg-white text-xl font-bold text-red-600 hover:bg-red-100"
                                    >
                                        −
                                    </button>
                                    <span className="text-sm font-bold text-red-600">
                                        In cart ({cartQty})
                                    </span>
                                    <button
                                        onClick={handleAddToCart}
                                        className="h-9 w-9 rounded-md bg-white text-xl font-bold text-red-600 hover:bg-red-100"
                                    >
                                        +
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-bold transition ${
                                    isLiked
                                        ? "border-red-300 bg-red-50 text-red-600"
                                        : "border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:text-red-600"
                                }`}
                            >
                                {isLiked ? "❤️ Saved" : "🤍 Save"}
                            </button>

                            <Link
                                to="/cart"
                                className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-red-300 hover:text-red-600"
                            >
                                View cart
                            </Link>
                        </div>

                        <button
                            onClick={handleBuyNow}
                            className="mt-3 w-full rounded-md bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                        >
                            Buy now →
                        </button>

                        <div className="mt-8">
                            <h2 className="text-lg font-bold text-slate-900">
                                Ingredients
                                <span className="ml-2 text-sm font-medium text-slate-500">
                                    ({product.ingredients?.length})
                                </span>
                            </h2>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {product.ingredients?.map((item, i) => (
                                    <span
                                        key={i}
                                        className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {product.tags && product.tags.length > 0 && (
                            <div className="mt-6">
                                <h2 className="text-lg font-bold text-slate-900">Tags</h2>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {product.tags.map((t, i) => (
                                        <span
                                            key={i}
                                            className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
                                        >
                                            #{t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 rounded-3xl bg-white p-6 shadow-sm md:p-8">
                    <h2 className="text-2xl font-bold text-slate-900">
                        How to cook it
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Click on a step to expand the instructions.
                    </p>

                    <ul className="mt-5 flex flex-col gap-2">
                        {product.instructions?.map((item, index) => (
                            <InstructionsView
                                key={index}
                                item={item}
                                index={index}
                                isOpen={openStep === index}
                                onToggle={() => handleToggle(index)}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProductView;
