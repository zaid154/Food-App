import { useEffect, useState } from "react";
import { useParams } from "react-router";
import InstructionsView from "./insructionView";



const ProductView = () => {
    const { id } = useParams();
    const [product, setproduct] = useState(null);
    useEffect(() => {
        const fetchdata = async () => {
            const data = await fetch("https://dummyjson.com/recipes");
            const jsondata = await data.json();
            const productdetail = jsondata.recipes.find(data => data.id == id);
            setproduct(productdetail)
        }
        fetchdata();
    }, [id])
    const [Instructions, setInstructions] = useState(false)

    if (product == null) {
        return true
    }
    return (
        <div className="flex bg-gray-100 m-2 p-4 rounded-xl">
            <img
                className="h-[400] rounded-3xl"
                src={product?.image}
            />
            <div className="ml-6 flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                    Name: {product?.name}
                </h1>
                <div className="flex flex-row gap-4 font-medium text-[12px]">
                    <p className="bg-amber-200 pl-2.5 pr-2.5 rounded-full ">{product?.cookTimeMinutes} Mins</p>
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


                <h3 className="font-semibold mt-3">Instructions:</h3>
                <ul className="list-disc pl-5">
                    {/* {product?.instructions?.map((item, index) => (
                        (index == 0) ? setInstructions(() => (!Instructions)) :
                            <li className={Instructions ? "none" : "block"}>{item}</li>
                    ))} */}
                    <InstructionsView data={product?.instructions}/>
                </ul>


            </div>

        </div>
    )
}

export default ProductView;


