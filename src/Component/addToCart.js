import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeCart } from "../utils/cartSlice";

const AddToCart = () => {
  const cartItems = useSelector((store) => store.cart.item);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.caloriesPerServing || 0),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-5">
        <h1>Cart is Empty</h1>

        <Link to="/">
          <button>Go to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Cart</h1>

        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear Cart
        </button>
      </div>

      {cartItems.map((item, index) => (
        <div
          key={index}
          className="border p-4 mb-4 rounded"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-40 h-40 object-cover"
          />

          <h2 className="text-xl font-bold mt-2">
            {item.name}
          </h2>

          <p>Rs. {item.caloriesPerServing}</p>

          <button
            onClick={() => dispatch(removeCart(index))}
            className="bg-red-500 text-white px-3 py-1 rounded mt-2"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-5">
        Total: Rs. {totalAmount}
      </h2>
    </div>
  );
};

export default AddToCart;   