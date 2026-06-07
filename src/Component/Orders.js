import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserContext from "./Usercontext";

const Orders = () => {
    const allOrders = useSelector((store) => store.orders.list);
    const { user } = useContext(UserContext);

    // only show orders for the logged-in user
    const myOrders = user
        ? allOrders.filter((o) => o.userEmail === user.email)
        : [];

    if (myOrders.length === 0) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center bg-orange-50 px-4">
                <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow">
                    <h1 className="text-2xl font-bold text-slate-900">No orders yet</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        When you place an order it will show up here.
                    </p>
                    <Link
                        to="/"
                        className="mt-5 inline-block rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white"
                    >
                        Start ordering
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-orange-50 px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-black text-slate-900">My Orders</h1>
                <p className="mt-1 text-sm text-slate-600">
                    {myOrders.length} order{myOrders.length > 1 ? "s" : ""} so far
                </p>

                <div className="mt-8 space-y-5">
                    {myOrders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-2xl bg-white p-5 shadow"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm text-slate-500">Order #{order.id}</p>
                                    <p className="text-xs text-slate-400">{order.date}</p>
                                </div>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                    {order.status}
                                </span>
                            </div>

                            <div className="mt-4 grid gap-2 text-sm text-slate-700">
                                <p>
                                    <span className="font-semibold">Deliver to:</span>{" "}
                                    {order.customerName}, {order.address}
                                </p>
                                <p>
                                    <span className="font-semibold">Phone:</span> {order.phone}
                                </p>
                                <p>
                                    <span className="font-semibold">Payment:</span> {order.payment}
                                </p>
                            </div>

                            <ul className="mt-4 space-y-1 border-t border-slate-100 pt-3 text-sm">
                                {order.items.map((it) => (
                                    <li key={it.id} className="flex justify-between text-slate-700">
                                        <span>
                                            {it.name}{" "}
                                            <span className="text-slate-400">x{it.quantity || 1}</span>
                                        </span>
                                        <span>Rs. {(it.caloriesPerServing || 0) * (it.quantity || 1)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 text-base font-bold">
                                <span>Total</span>
                                <span>Rs. {order.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Orders;
