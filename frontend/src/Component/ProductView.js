import { useState ,useContext } from "react";
import { useParams } from "react-router";
import InstructionsView from "./InstructionsView";
import useResipe from "./useRecipes";
import UserContext from "./Usercontext"

const ProductView = () => {
    const { id } = useParams();
    const data = useResipe(); // ✅ API reuse

    const Usecontext=useContext(UserContext)

    console.log("abcname",Usecontext);
     

    const [openStep, setOpenStep] = useState(null);

    // Loading
    if (!data) {
        return (
            <p className="text-center mt-10 text-gray-500">
                Loading...
            </p>
        );
    }

    // Find product
    const product = data.recipes.find(
        (item) => item.id == id
    );

    // Toggle function
    const handleToggle = (index) => {
        setOpenStep((prev) =>
            prev === index ? null : index
        );
    };

    return (
        <div className="flex bg-gray-100 m-2 p-4 rounded-xl">

            {/* Image */}
            <img
                className="h-[400px] rounded-3xl"
                src={product?.image}
                alt={product?.name}
            />

            {/* Details */}
            <div className="ml-6 flex flex-col gap-2 w-full">

                <h1 className="text-2xl font-bold">
                    {product?.name}
                </h1>

                {/* Info */}
                <div className="flex flex-wrap gap-3 text-[12px]">
                    <p className="bg-amber-200 px-3 rounded-full">
                        ⏱ {product?.cookTimeMinutes} mins
                    </p>

                    <p className="bg-amber-200 px-3 rounded-full">
                        ⭐ {product?.rating}
                    </p>

                    <p className="bg-amber-200 px-3 rounded-full">
                        🔥 {product?.caloriesPerServing} cal
                    </p>

                    <p className="bg-amber-200 px-3 rounded-full">
                        🍽 {product?.cuisine}
                    </p>

                    <p className="bg-amber-200 px-3 rounded-full">
                        🥗 {product?.mealType}
                    </p>
                </div>

                {/* Ingredients */}
                <div>
                    <h3 className="font-bold mt-3 text-xl">
                        Ingredients:
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2 text-[12px]">
                        {product?.ingredients?.map((item, i) => (
                            <span
                                key={i}
                                className="bg-amber-400 px-3 rounded-full"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <h3 className="font-bold mt-3 text-xl">
                    Instructions:
                </h3>

                <ul className="mt-1 flex flex-col gap-1">
                    {product?.instructions?.map((item, index) => (
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
    );
};

export default ProductView;