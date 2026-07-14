import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InstructionsView from "./InstructionsView";
import useResipe from "./useRecipes";
import Shimmer from "./Shimmer";
import { addCart, removeCart } from "../utils/cartSlice";
import { addWishlist, removeWishlist } from "../utils/wishlistSlice";

// Clean line icons (no emoji) so the page reads as a real product, not AI-generated.
const icon = "h-5 w-5";
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const FlameIcon = () => (
  <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);
const BowlIcon = () => (
  <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11h18" />
    <path d="M4 11a8 8 0 0 0 16 0" />
    <path d="M12 4v3" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" className={icon} fill="currentColor">
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.9-1.01L12 2z" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const Stat = ({ children, label, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm">
    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600">
      {children}
    </div>
    <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
    <p className="text-sm font-bold text-slate-900">{value}</p>
  </div>
);

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
            <div className="mx-auto max-w-[1400px] px-4 py-4 md:py-6">
                <nav className="mb-4 text-sm text-slate-500">
                    <Link to="/" className="hover:text-red-600">Home</Link>
                    <span className="mx-2">›</span>
                    <span className="text-slate-700">{product.name}</span>
                </nav>

                <div className="grid justify-center gap-8 lg:grid-cols-[540px_minmax(0,620px)]">
                    <div className="relative h-[470px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />

                        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-sm font-bold text-white shadow">
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
                            className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110 ${
                                isLiked ? "text-red-600" : "text-slate-400"
                            }`}
                        >
                            <HeartIcon filled={isLiked} />
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
                            <Stat label="Cook" value={`${product.cookTimeMinutes} min`}>
                                <ClockIcon />
                            </Stat>
                            <Stat label="Calories" value={product.caloriesPerServing}>
                                <FlameIcon />
                            </Stat>
                            <Stat label="Servings" value={product.servings}>
                                <BowlIcon />
                            </Stat>
                            <Stat label="Rating" value={product.rating}>
                                <StarIcon />
                            </Stat>
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
                                    className="flex-1 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                                >
                                    Add to cart
                                </button>
                            ) : (
                                <div className="flex flex-1 items-center justify-between rounded-lg border-2 border-red-400 bg-red-50 px-3 py-1">
                                    <button
                                        onClick={handleRemoveFromCart}
                                        className="h-9 w-9 rounded-lg bg-white text-xl font-bold text-red-600 hover:bg-red-100"
                                    >
                                        −
                                    </button>
                                    <span className="text-sm font-bold text-red-600">
                                        In cart ({cartQty})
                                    </span>
                                    <button
                                        onClick={handleAddToCart}
                                        className="h-9 w-9 rounded-lg bg-white text-xl font-bold text-red-600 hover:bg-red-100"
                                    >
                                        +
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-bold transition ${
                                    isLiked
                                        ? "border-red-300 bg-red-50 text-red-600"
                                        : "border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:text-red-600"
                                }`}
                            >
                                <HeartIcon filled={isLiked} />
                                {isLiked ? "Saved" : "Save"}
                            </button>

                            <Link
                                to="/cart"
                                className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-red-300 hover:text-red-600"
                            >
                                View cart
                            </Link>
                        </div>

                        <button
                            onClick={handleBuyNow}
                            className="mt-3 w-full rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700"
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
                                        className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
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
                                            className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600"
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
