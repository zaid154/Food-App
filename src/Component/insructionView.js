import { useState } from "react";

const InstructionsView = ({ data }) => {

    const [instruction, setInstruction] = useState(false)

    function changeInstruction() {
        console.log("click",instruction)

        setInstruction(!instruction)
    }

    return (
        <>
            {data ? (
                data.map((item, index) => {
                    return (
                        <div key={index}>
                        <button onClick={()=>changeInstruction()}>Step {index+1}</button>
                        <div key={index} className={ `border m-1 p-2 bg-gray-300 text-white rounded-2xl ${instruction?"hidden":"block"}`  }>
                            {item}
                        </div>
                        </div>
                    );
                })
            ) : null}
        </>
    );
};

export default InstructionsView;