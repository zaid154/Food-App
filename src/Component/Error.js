import { useRouteError } from "react-router";
const Error = () => {
    const error=useRouteError();
    console.log(error);
    return (
        <div className="abc">
            <h1>{error.status}:{error.statusText}</h1>
        </div>
    )
};

export default Error;