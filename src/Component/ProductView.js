import { useEffect, useState } from "react";
import { useParams } from "react-router";
import InstructionsView from "./InstructionsView";

const ProductView = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [openStep, setOpenStep] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("https://dummyjson.com/recipes");
            const jsonData = await data.json();
            const productDetail = jsonData.recipes.find(item => item.id == id);
            setProduct(productDetail);
        };
        fetchData();
    }, [id]);

    const handleToggle = (index) => {
        setOpenStep(prev => prev === index ? null : index);
    };

    if (product == null) {
        return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    }

    return (
        <div className="flex bg-gray-100 m-2 p-4 rounded-xl">
            <img
                className="h-[400px] rounded-3xl"
                src={product?.image}
                alt={product?.name}
            />
            <div className="ml-6 flex flex-col gap-2 w-full">
                <h1 className="text-2xl font-bold">
                    Name: {product?.name}
                </h1>

                <div className="flex flex-row gap-4 font-medium text-[12px]">
                    <p className="bg-amber-200 pl-2.5 pr-2.5 rounded-full">{product?.cookTimeMinutes} Mins</p>
                    <p className="bg-amber-200 pl-2.5 pr-2.5 rounded-full">{product?.rating} Rating</p>
                    <p className="bg-amber-200 pl-2.5 pr-2.5 rounded-full">{product?.caloriesPerServing} Calories Per Serving</p>
                    <p className="bg-amber-200 pl-2.5 pr-2.5 rounded-full">Cuisine: {product?.cuisine}</p>
                    <p className="bg-amber-200 pl-2.5 pr-2.5 rounded-full">Meal: {product?.mealType}</p>
                </div>

                <div>
                    <h3 className="font-bold mt-3 text-2xl">Ingredients:</h3>
                    <div className="flex flex-wrap gap-2 mt-2 font-medium text-[12px]">
                        {product?.ingredients?.map((item, i) => (
                            <span
                                key={i}
                                className="bg-amber-400 pl-2.5 pr-2.5 rounded-full"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <h3 className="font-bold mt-3 text-xl">Instructions:</h3>
                <ul className="pl-0 mt-1 flex flex-col gap-1">
                    {product?.instructions.map((item, index) => (
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