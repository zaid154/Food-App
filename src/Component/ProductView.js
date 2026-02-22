import { useEffect, useState } from "react";
import { useParams } from "react-router";
const ProductView=()=>{
    const {id}=useParams();
    const [product,setproduct]=useState(null);
    useEffect(()=>{
        const fetchdata=async()=>{
            const data=await fetch("https://dummyjson.com/recipes");
            const jsondata=await data.json();
            // console.log(jsondata.recipes);
            const productdetail=jsondata.recipes.find(data=>data.id==id);
            // console.log("pro-de",productdetail);
            setproduct(productdetail)
        }
        fetchdata();
    },[id])
    if (product==null) {
        return true
    }
    return (
        <div>
            <img className="proview" src={product?.image}></img>
            <h1>{product?.name}</h1>
            <h3>{product?.cookTimeMinutes}</h3>
            <h3>{product?.rating}</h3>
            <h3>{product?.ingredients}</h3>
            <h3>{product?.mealType}</h3>
            <h3>{product?.cuisine}</h3>
            <h3>{product?.caloriesPerServing}</h3>
            <h3>{product?.userId}</h3>
        </div>
    )
}

export default ProductView;