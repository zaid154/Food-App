import { useState } from "react";

const About = () => {
    const [count,setCount]=useState(0)
    return (
        <div className="user-profile">
            <h1>Name : Zaid</h1>
            <h3>Add : Delhi</h3>
            <h3>{count}</h3>
            <button onClick={()=>setCount(count+1)}>Click</button>
        </div>
    )
};

export default About;