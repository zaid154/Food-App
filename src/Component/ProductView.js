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

    // IMPORTANT: all hooks must be called in the same order every render.
    // so we call useSelector here at the top, BEFORE any early return.
    const cartItems = useSelector((store) => store.cart.item);
    const wishlistItems = useSelector((store) => store.wishlist.item);

    // show shimmer while the api data is loading
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

    // check if this recipe is already in cart / wishlist
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

    // BUY NOW — just this one product, do NOT touch the cart.
    // we pass the product to /checkout using router state.
    const handleBuyNow = () => {
        navigate("/checkout", { state: { buyNowItem: product } });
    };

    // toggle wishlist on / off when heart is clicked
    const handleLike = () => {
        if (isLiked) {
            dispatch(removeWishlist(product.id));
        } else {
            dispatch(addWishlist(product));
        }
    };

    return (
        <section className="bg-gradient-to-b from-amber-50 via-white to-white">
            <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">

                {/* breadcrumb */}
                <nav className="mb-6 text-sm text-slate-500">
                    <Link to="/" className="hover:text-orange-600">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-slate-700">{product.name}</span>
                </nav>

                <div className="grid gap-8 lg:grid-cols-2">

                    {/* LEFT — image with badges. aspect-square keeps a clean
                        equal box on every screen so the food photo never gets
                        stretched or awkwardly cropped */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-amber-50 shadow-xl">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />

                        {/* rating badge */}
                        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-amber-700 shadow">
                            ★ {product.rating} ({product.reviewCount})
                        </span>

                        {/* difficulty badge */}
                        {product.difficulty && (
                            <span className="absolute left-4 top-14 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
                                {product.difficulty}
                            </span>
                        )}

                        {/* big heart button on the image */}
                        <button
                            onClick={handleLike}
                            aria-label="Save to favorites"
                            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:scale-110"
                        >
                            {isLiked ? "❤️" : "🤍"}
                        </button>
                    </div>

                    {/* RIGHT — details */}
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600">
                            {product.cuisine} cuisine
                        </p>

                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                            {product.name}
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            {Array.isArray(product.mealType) ? product.mealType.join(" • ") : product.mealType}
                        </p>

                        {/* quick info cards */}
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

                        {/* price */}
                        <div className="mt-6 rounded-2xl bg-orange-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-orange-700">Price</p>
                            <p className="mt-1 text-4xl font-extrabold text-slate-900">
                                ₹{product.caloriesPerServing}
                                <span className="ml-2 text-xs font-medium text-slate-500">incl. taxes</span>
                            </p>
                        </div>

                        {/* action buttons */}
                        <div className="mt-5 flex flex-wrap gap-3">
                            {/* cart action — switches to a stepper if item is already in cart */}
                            {cartQty === 0 ? (
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                                >
                                    Add to cart
                                </button>
                            ) : (
                                <div className="flex flex-1 items-center justify-between rounded-full border-2 border-green-400 bg-green-50 px-3 py-1">
                                    <button
                                        onClick={handleRemoveFromCart}
                                        className="h-9 w-9 rounded-full bg-white text-xl font-bold text-green-700 hover:bg-green-100"
                                    >
                                        −
                                    </button>
                                    <span className="text-sm font-bold text-green-700">
                                        In cart ({cartQty})
                                    </span>
                                    <button
                                        onClick={handleAddToCart}
                                        className="h-9 w-9 rounded-full bg-white text-xl font-bold text-green-700 hover:bg-green-100"
                                    >
                                        +
                                    </button>
                                </div>
                            )}

                            {/* favorite button next to add-to-cart */}
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${
                                    isLiked
                                        ? "border-red-300 bg-red-50 text-red-600"
                                        : "border-slate-300 bg-white text-slate-700 hover:border-red-300 hover:text-red-600"
                                }`}
                            >
                                {isLiked ? "❤️ Saved" : "🤍 Save"}
                            </button>

                            <Link
                                to="/cart"
                                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-600"
                            >
                                View cart
                            </Link>
                        </div>

                        {/* Buy now — full-width orange call to action.
                            adds item to cart and jumps to /checkout */}
                        <button
                            onClick={handleBuyNow}
                            className="mt-3 w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-600"
                        >
                            Buy now →
                        </button>

                        {/* ingredients */}
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
                                        className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* tags */}
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

                {/* Instructions */}
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
