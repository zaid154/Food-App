import React, { Suspense, useState, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

import Header from "./src/Component/Header";
import Cart from "./src/Component/Cart";
import Footer from "./src/Component/Footer";
import About from "./src/Component/About";
import Contact from "./src/Component/Contact";
import AddToCart from "./src/Component/AddToCart"; // ✅ FIXED
import Error from "./src/Component/Error";
import ProductView from "./src/Component/ProductView";
import Shimmer from "./src/Component/Shimmer";
import UseContext from "./src/Component/Usercontext";
import Input from "./src/Component/Input";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./src/utils/Store";

// Lazy Load
const Grocery = lazy(() => import("./src/Component/Grocery"));


// ✅ App Layout
let App = () => {
  const [username, setusername] = useState("zaid");

  return (
    <>
      <Provider store={appStore}>
        <UseContext.Provider value={{ name: username }}>
          <Header />
          <Input username={username} setusername={setusername} />
          <Outlet />
        </UseContext.Provider>
      </Provider>

      <Footer />
    </>
  );
};


// ✅ Routing
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
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact name={"zaid"} add={"uppp"} />
      },
      {
        path: "/cart",
        element: <AddToCart /> // ✅ FIXED
      },
      {
        path: "restaurant/:id?",
        element: <ProductView />
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        )
      }
    ]
  }
]);


// ✅ Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRuter} />);