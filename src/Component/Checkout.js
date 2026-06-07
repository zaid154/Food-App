import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { addOrder } from "../utils/ordersSlice";
import UserContext from "./Usercontext";

const Checkout = () => {
    const cartItems = useSelector((store) => store.cart.item);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(UserContext);

    // if the user came here from a "Buy now" button, that product
    // is passed through router state. otherwise we use the normal cart.
    const buyNowItem = location.state && location.state.buyNowItem;
    const isBuyNow = Boolean(buyNowItem);

    // items shown on this page:
    //   buy now flow -> only that single product, quantity 1
    //   normal flow  -> whatever is in the cart
    const items = isBuyNow
        ? [{ ...buyNowItem, quantity: 1 }]
        : cartItems;

    const [name, setName] = useState(user ? user.name : "");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [payment, setPayment] = useState("Cash on Delivery");
    const [error, setError] = useState("");

    // calculate totals from whichever items list we are using
    const totalItems = items.reduce((n, i) => n + (i.quantity || 1), 0);
    const subtotal = items.reduce(
        (sum, item) => sum + (item.caloriesPerServing || 0) * (item.quantity || 1),
        0
    );
    const deliveryFee = totalItems > 0 ? 49 : 0;
    const taxes = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + deliveryFee + taxes;

    const placeOrder = (e) => {
        e.preventDefault();

        if (name === "" || address === "" || phone === "") {
            setError("Please fill all the fields");
            return;
        }

        if (items.length === 0) {
            setError("No items to order");
            return;
        }

        // build a new order object
        const newOrder = {
            id: Date.now(),
            userEmail: user ? user.email : "guest",
            customerName: name,
            address: address,
            phone: phone,
            payment: payment,
            items: items,
            total: grandTotal,
            status: "Placed",
            date: new Date().toLocaleString()
        };

        dispatch(addOrder(newOrder));

        // only empty the cart for a normal checkout.
        // a "buy now" order should leave the existing cart untouched.
        if (!isBuyNow) {
            dispatch(clearCart());
        }

        alert("Order placed successfully!");
        navigate("/orders");
    };

    if (items.length === 0) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Nothing to checkout
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Add some recipes or use Buy now first.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-orange-50 px-4 py-10">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.2fr_1fr]">

                {/* delivery form */}
                <form onSubmit={placeOrder} className="rounded-2xl bg-white p-6 shadow">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Delivery Details
                        </h1>
                        {isBuyNow && (
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                                Buy Now
                            </span>
                        )}
                    </div>

                    <div className="mt-5 space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-700">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-400"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-slate-700">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-400"
                                placeholder="10-digit number"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-slate-700">Address</label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows={3}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-400"
                                placeholder="House no, street, city"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-slate-700">Payment</label>
                            <select
                                value={payment}
                                onChange={(e) => setPayment(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-400"
                            >
                                <option>Cash on Delivery</option>
                                <option>UPI</option>
                                <option>Credit / Debit Card</option>
                            </select>
                        </div>

                        {error && (
                            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-full bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600"
                        >
                            Place Order — Rs. {grandTotal}
                        </button>
                    </div>
                </form>

                {/* order summary */}
                <aside className="rounded-2xl bg-slate-900 p-6 text-white shadow">
                    <h2 className="text-xl font-bold">Order Summary</h2>
                    {isBuyNow && (
                        <p className="mt-1 text-xs text-orange-300">
                            Buying this item only — your cart is not affected
                        </p>
                    )}

                    <ul className="mt-4 space-y-3">
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between border-b border-white/10 pb-2 text-sm">
                                <span>
                                    {item.name}{" "}
                                    <span className="text-orange-300">x{item.quantity || 1}</span>
                                </span>
                                <span>Rs. {(item.caloriesPerServing || 0) * (item.quantity || 1)}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 space-y-2 text-sm text-slate-300">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rs. {subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>Rs. {deliveryFee}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxes</span>
                            <span>Rs. {taxes}</span>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between border-t border-white/10 pt-3 text-lg font-bold">
                        <span>Total</span>
                        <span>Rs. {grandTotal}</span>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Checkout;
