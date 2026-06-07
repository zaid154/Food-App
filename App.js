import React, { Suspense, useState, useEffect, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

import Header from "./src/Component/Header";
import Cart from "./src/Component/Cart";
import Footer from "./src/Component/Footer";
import About from "./src/Component/About";
import Contact from "./src/Component/Contact";
import AddToCart from "./src/Component/AddToCart";
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

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./src/utils/Store";

// Lazy Load
const Grocery = lazy(() => import("./src/Component/Grocery"));


// App Layout
let App = () => {
  // user state holds the logged-in user (null when not logged in)
  const [user, setUser] = useState(null);

  // when the app starts, check if a user was logged in earlier
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("loggedUser"));
    if (saved) {
      setUser(saved);
    }
  }, []);

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


// Routing
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
        // only logged-in users can reach checkout
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )
      },
      {
        // only logged-in users can see their orders
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


// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRuter} />);
