import React, { Suspense, useState, useEffect, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

import Header from "./src/Component/Header";
import Cart from "./src/Component/Cart";
import Footer from "./src/Component/Footer";
import About from "./src/Component/About";
import Contact from "./src/Component/Contact";
import AddToCart from "./src/Component/addToCart";
import Error from "./src/Component/Error";
import ProductView from "./src/Component/ProductView";
import Shimmer from "./src/Component/Shimmer";
import UseContext from "./src/Component/Usercontext";
import Login from "./src/Component/Login";
import Register from "./src/Component/Register";
import Wishlist from "./src/Component/Wishlist";
import Checkout from "./src/Component/Checkout";
import Orders from "./src/Component/Orders";
import ProtectedRoute from "./src/Component/ProtectedRoute";
import ChatGptModel from "./src/Component/ChatGptModel";

import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./src/utils/Store";


const Grocery = lazy(() => import("./src/Component/Grocery"));

let App = () => {
  // Hydrate the user synchronously on the first render. Doing this in an effect
  // (which runs after paint) let ProtectedRoute see user===null first and bounce
  // a logged-in user to /login on refresh / direct visit of a protected route.
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedUser")) || null;
    } catch {
      return null;
    }
  });
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Provider store={appStore}>
      <UseContext.Provider value={{ user, setUser }}>
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </UseContext.Provider>
    </Provider>
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
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact name={"zaid"} add={"uppp"} />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      },
      {
        path: "/cart",
        element: <AddToCart />
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        )
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
      },
      {
        path: "/chat",
        element: <ChatGptModel />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRuter} />);
