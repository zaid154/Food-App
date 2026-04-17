import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Header from "./src/Component/Header";
import Cart from "./src/Component/Cart";
import Footer from "./src/Component/Footer.js"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./src/Component/About.js";
import Contact from "./src/Component/Contact.js";
import AddToCart from "./src/Component/addToCart.js";
import Error from "./src/Component/Error.js";
import ProductView from "./src/Component/ProductView.js";
import { lazy, useContext } from "react";
import Shimmer from "./src/Component/Shimmer.js";
import UseContext from "./src/Component/Usercontext.js"
const Grocery = lazy(() => import('./src/Component/Grocery.js'))
import Input from "./src/Component/Input.js"
import appStore from "./src/utils/Store.js"
import { Provider } from "react-redux";

let App = () => {
  const [username,setusername]= useState("zaid")
  return (
    <>
      <Provider store={appStore}>
      <UseContext.Provider value={{ name: username}}>
      <Header />
      <Input username={username} setusername={setusername}/>
      <Outlet />
      </UseContext.Provider>
      </Provider>

      {/* <Footer /> */}
    </>
  );
};

const appRuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Cart />
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <Error />
      },
      {
        path: "/contact",
        element: <Contact name={"zaid"} add={"uppp"} />,
        errorElement: <Error />
      },
      {
        path: "/cart",
        element: <AddToCart />,
        errorElement: <Error />
      },
      {
        path: "restaurant/:id?",
        element:  <ProductView /> 
      },
      {
        path: "/grocery",
        element: <Suspense fallback={<Shimmer />}><Grocery /></Suspense>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRuter} />);



