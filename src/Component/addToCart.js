import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeCart } from "../utils/cartSlice";

const AddToCart = () => {
    const cartItems = useSelector((store) => store.cart.item);
    const dispatch = useDispatch();

    const totalItems = cartItems.length;
    const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.caloriesPerServing || 0),
        0
    );
    const deliveryFee = totalItems > 0 ? 49 : 0;
    const taxes = totalItems > 0 ? Math.round(totalAmount * 0.05) : 0;
    const grandTotal = totalAmount + deliveryFee + taxes;

    if (totalItems === 0) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-100 px-4 py-10">
                <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[32px] bg-white/80 p-8 shadow-[0_24px_80px_rgba(251,146,60,0.18)] backdrop-blur md:p-12">
                        <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                            Your cart is waiting
                        </span>

                        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                            Add something delicious before checkout.
                        </h1>

                        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                            Pick your favorite meals, build a quick combo, and we will
                            keep the cart ready for you.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                to="/"
                                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                                Browse menu
                            </Link>

                            <Link
                                to="/grocery"
                                className="rounded-full border border-orange-200 bg-orange-50 px-6 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:border-orange-300"
                            >
                                Explore groceries
                            </Link>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.32)]">
                        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-400/30 blur-3xl" />
                        <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />

                        <div className="relative space-y-6">
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-orange-200">
                                    Quick perks
                                </p>
                                <h2 className="mt-3 text-3xl font-bold">
                                    Fresh picks, fast checkout
                                </h2>
                            </div>

                            <div className="grid gap-4">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-sm text-orange-100">Curated meals</p>
                                    <p className="mt-2 text-xl font-semibold">
                                        Discover trending dishes from the home page.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-sm text-orange-100">Ready in minutes</p>
                                    <p className="mt-2 text-xl font-semibold">
                                        Save favorites and finish checkout when you are ready.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(254,215,170,0.45),_transparent_35%),linear-gradient(180deg,_#fff7ed_0%,_#ffffff_45%,_#f8fafc_100%)] px-4 py-8 md:px-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600">
                            Cart overview
                        </p>
                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
                            Your selected meals
                        </h1>
                        <p className="mt-3 max-w-2xl text-slate-600">
                            Review your picks, remove anything you do not need, and head
                            to checkout with a cleaner, brighter cart layout.
                        </p>
                    </div>

                    <button
                        onClick={() => dispatch(clearCart())}
                        className="rounded-full border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50"
                    >
                        Clear cart
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
                    <div className="space-y-5">
                        {cartItems.map((item, index) => (
                            <article
                                key={`${item.id}-${index}`}
                                className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur"
                            >
                                <div className="flex flex-col gap-5 p-5 md:flex-row md:p-6">
                                    <div className="overflow-hidden rounded-[24px] bg-orange-100 md:w-56">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                            <div>
                                                <h2 className="text-2xl font-bold text-slate-900">
                                                    {item.name}
                                                </h2>
                                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                                    {item.ingredients?.slice(0, 5).join(", ")}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white">
                                                <p className="text-xs uppercase tracking-[0.2em] text-orange-200">
                                                    Price
                                                </p>
                                                <p className="mt-1 text-2xl font-bold">
                                                    Rs. {item.caloriesPerServing}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-slate-700">
                                            <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-700">
                                                {item.cuisine}
                                            </span>
                                            <span className="rounded-full bg-amber-100 px-4 py-2 text-amber-700">
                                                {item.mealType?.join(", ")}
                                            </span>
                                            <span className="rounded-full bg-lime-100 px-4 py-2 text-lime-700">
                                                {item.rating} rating
                                            </span>
                                        </div>

                                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                                            <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                                                <span>{item.cookTimeMinutes} min cook time</span>
                                                <span>{item.reviewCount} reviews</span>
                                            </div>

                                            <button
                                                onClick={() => dispatch(removeCart(index))}
                                                className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-600"
                                            >
                                                Remove item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <aside className="h-fit rounded-[30px] bg-slate-900 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] md:p-7">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">
                            Order summary
                        </p>
                        <h2 className="mt-3 text-3xl font-bold">Ready to checkout</h2>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="rounded-3xl bg-white/5 p-4">
                                <p className="text-sm text-slate-300">Items</p>
                                <p className="mt-2 text-3xl font-bold">{totalItems}</p>
                            </div>

                            <div className="rounded-3xl bg-white/5 p-4">
                                <p className="text-sm text-slate-300">Total</p>
                                <p className="mt-2 text-3xl font-bold">Rs. {grandTotal}</p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5">
                            <div className="flex items-center justify-between text-sm text-slate-300">
                                <span>Subtotal</span>
                                <span>Rs. {totalAmount}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-slate-300">
                                <span>Delivery</span>
                                <span>Rs. {deliveryFee}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-slate-300">
                                <span>Taxes</span>
                                <span>Rs. {taxes}</span>
                            </div>

                            <div className="border-t border-white/10 pt-4">
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span>Grand total</span>
                                    <span>Rs. {grandTotal}</span>
                                </div>
                            </div>
                        </div>

                        <button className="mt-8 w-full rounded-full bg-orange-400 px-6 py-4 text-base font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-300">
                            Proceed to checkout
                        </button>

                        <Link
                            to="/"
                            className="mt-4 block text-center text-sm font-medium text-orange-200 underline underline-offset-4"
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
