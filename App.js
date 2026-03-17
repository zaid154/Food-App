import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Header from "./src/Component/Header";
import Card from "./src/Component/Cart";
import Footer from "./src/Component/Footer.js"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./src/Component/About.js";
import Contact from "./src/Component/Contact.js";
import Order_Cart from "./src/Component/Order_Cart.js";
import Error from "./src/Component/Error.js";
import ProductView from "./src/Component/ProductView.js";
import { lazy } from "react";
import Shimmer from "./src/Component/shimmer.js";
const Grocery = lazy(()=>import('./src/Component/Grocery.js'))

let App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const appRuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children:[
      {
        path:"/",
        element:<Card/>
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <Error />
      },
      {
        path: "/contact",
        element: <Contact name={"zaid"}add={"uppp"}/>,
        errorElement: <Error />
      },
      {
        path: "/cart",
        element: <Order_Cart />,
        errorElement: <Error />
      },
      {
        path:"restaurant/:id?",
        element:<ProductView/>
      },
      {
        path:"/grocery",
        element:<Suspense fallback={<Shimmer/>}><Grocery/></Suspense>
      } 
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRuter} />);



