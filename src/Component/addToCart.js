import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, clearCart, removeCart } from "../utils/cartSlice";

const AddToCart = () => {
    const cartItems = useSelector((store) => store.cart.item);
    const dispatch = useDispatch();

    const totalItems = cartItems.reduce((n, i) => n + (i.quantity || 1), 0);
    const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.caloriesPerServing || 0) * (item.quantity || 1),
        0
    );
    const deliveryFee = totalItems > 0 ? 49 : 0;
    const taxes = totalItems > 0 ? Math.round(totalAmount * 0.05) : 0;
    const grandTotal = totalAmount + deliveryFee + taxes;

    if (totalItems === 0) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-10">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="text-5xl">🛒</div>
                    <h1 className="mt-4 text-xl font-bold text-gray-900">
                        Your cart is empty
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Add some dishes to get started.
                    </p>

                    <div className="mt-6 flex justify-center gap-3">
                        <Link
                            to="/"
                            className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            Browse menu
                        </Link>
                        <Link
                            to="/grocery"
                            className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400"
                        >
                            Grocery
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-8 md:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                        Cart ({totalItems})
                    </h1>

                    <button
                        onClick={() => dispatch(clearCart())}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                    >
                        Clear cart
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
                    <div className="space-y-4">
                        {cartItems.map((item, index) => (
                            <article
                                key={`${item.id}-${index}`}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div className="flex flex-col gap-4 p-4 md:flex-row">
                                    <div className="h-40 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 md:h-32 md:w-44">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900">
                                                    {item.name}
                                                </h2>
                                                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                                    {item.ingredients?.slice(0, 5).join(", ")}
                                                </p>
                                            </div>
                                            <p className="whitespace-nowrap text-lg font-bold text-gray-900">
                                                ₹{item.caloriesPerServing}
                                            </p>
                                        </div>

                                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                                            <span className="rounded-md bg-gray-100 px-2.5 py-1 text-gray-600">
                                                {item.cuisine}
                                            </span>
                                            <span className="inline-flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-white">
                                                {item.rating} ★
                                            </span>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                                            <span className="text-xs text-gray-400">
                                                {item.cookTimeMinutes} min · {item.reviewCount} reviews
                                            </span>

                                            <div className="flex items-center gap-3">
                                                <div className="inline-flex items-center rounded-md border border-gray-300 bg-white">
                                                    <button
                                                        onClick={() => dispatch(removeCart(item.id))}
                                                        aria-label="Decrease quantity"
                                                        className="h-8 w-8 text-lg font-bold text-red-600 transition hover:bg-gray-50"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="min-w-8 px-2 text-center text-sm font-semibold text-gray-900">
                                                        {item.quantity || 1}
                                                    </span>
                                                    <button
                                                        onClick={() => dispatch(addCart(item))}
                                                        aria-label="Increase quantity"
                                                        className="h-8 w-8 text-lg font-bold text-red-600 transition hover:bg-gray-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const q = item.quantity || 1;
                                                        for (let i = 0; i < q; i++) dispatch(removeCart(item.id));
                                                    }}
                                                    className="text-sm font-semibold text-gray-500 transition hover:text-red-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <aside className="sticky top-24 h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 className="text-base font-bold text-gray-900">Bill details</h2>

                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between text-gray-600">
                                <span>Item total ({totalItems})</span>
                                <span>₹{totalAmount}</span>
                            </div>

                            <div className="flex items-center justify-between text-gray-600">
                                <span>Delivery fee</span>
                                <span>₹{deliveryFee}</span>
                            </div>

                            <div className="flex items-center justify-between text-gray-600">
                                <span>Taxes</span>
                                <span>₹{taxes}</span>
                            </div>

                            <div className="border-t border-dashed border-gray-200 pt-3">
                                <div className="flex items-center justify-between text-base font-bold text-gray-900">
                                    <span>To pay</span>
                                    <span>₹{grandTotal}</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="mt-5 block w-full rounded-md bg-red-600 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-red-700"
                        >
                            Proceed to checkout
                        </Link>

                        <Link
                            to="/"
                            className="mt-3 block text-center text-sm font-medium text-red-600"
                        >
                            Continue shopping
                        </Link>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default AddToCart;
