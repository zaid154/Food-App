import { useEffect, useState } from "react";

let usegroceries = () => {
    const [data_groceries, setdata_groceries] = useState(null);

    useEffect(() => {
        const feachdata_groceries = async () => {
            const res = await fetch("https://dummyjson.com/products");
            const apiData = await res.json();
            setdata_groceries(apiData);
        };
        feachdata_groceries();
    }, []);

    return data_groceries;
};

export default usegroceries;