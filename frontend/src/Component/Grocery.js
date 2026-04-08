import Shimmer from "./Shimmer.js";
import usegroceries from "./Usegroceries";

const Grocery = () => {
    const Grocery_data = usegroceries();

    if (!Grocery_data) {
        return <Shimmer />;
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-4">
                Grocery Products
            </h1>

            <div className="flex flex-wrap gap-4 justify-center">
                {Grocery_data.products.map((Grocery_Cart) => {
                    const des_name = Grocery_Cart.title.split(" ");
                    return (
                        <div
                            className="flex flex-col pl-3 pr-3 pb-3 border rounded-lg w-[250px] h-auto shadow-md hover:shadow-xl transition"
                            key={Grocery_Cart.id}
                        >
                            <img
                                src={Grocery_Cart.thumbnail}
                                alt={Grocery_Cart.title}
                                className=" w-full object-cover rounded "
                            />

                            <div className="flex flex-col flex-grow justify-between">

                                <div>
                                    <p className="font-bold mt-2 text-lg">
                                        {des_name.slice(0, 3).join(" ")}
                                        {des_name.length > 3 && "..."}
                                    </p>

                                    <p className="font-bold text-md mt-1 text-center">
                                        description
                                    </p>

                                    <p className="text-sm text-gray-600 line-clamp-4 mt-1">
                                        {Grocery_Cart.description}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex justify-between mt-2">
                                        <span>₹{Grocery_Cart.price}</span>
                                        <span>{Grocery_Cart.rating} ⭐</span>
                                    </div>

                                    <div className="flex gap-2 mt-3">
                                        <button className="bg-pink-400 w-full h-8 rounded">
                                            Add to cart
                                        </button>
                                        <button className="bg-green-500 w-full h-8 rounded">
                                            Buy now
                                        </button>
                                    </div>
                                </div>

                            </div></div>
                    );
                })}
            </div>
        </>
    );
};

export default Grocery;