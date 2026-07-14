import { useState, useEffect, useContext } from "react";
import { LOGO } from "./../utils/Constants";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { clearWishlist } from "../utils/wishlistSlice";
import UserContext from "./Usercontext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const status = useOnline();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleDark = () => setDark((d) => !d);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    // Cart & wishlist live in shared localStorage keys, so clear them on logout
    // to stop the next user on this browser from inheriting them.
    dispatch(clearCart());
    dispatch(clearWishlist());
    setUser(null);
    navigate("/login");
  };

  const cartItem = useSelector((state) => state.cart.item);
  const cartCount = cartItem.reduce((n, i) => n + (i.quantity || 1), 0);

  const wishlistItem = useSelector((state) => state.wishlist.item);
  const wishlistCount = wishlistItem.length;

  const linkClass = ({ isActive }) =>
    `px-1 py-1 transition-colors hover:text-red-600 ${
      isActive ? "text-red-600" : "text-gray-600"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={LOGO} alt="YumRun logo" className="h-9 w-9 object-contain" />
          <span className="hidden text-xl font-bold tracking-tight text-gray-900 sm:inline">
            Yum<span className="text-red-600">Run</span>
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-semibold">
            <li>
              <span
                title={status ? "Online" : "Offline"}
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${status ? "text-green-600" : "text-gray-400"}`}
              >
                <span className={`h-2 w-2 rounded-full ${status ? "bg-green-500" : "bg-gray-400"}`} />
                {status ? "Online" : "Offline"}
              </span>
            </li>
            <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/grocery" className={linkClass}>Grocery</NavLink></li>
            <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
            <li><NavLink to="/chat" className={linkClass}>AI Chat</NavLink></li>

            <li>
              <NavLink to="/wishlist" className={linkClass}>
                ❤️ {wishlistCount}
              </NavLink>
            </li>

            {user && (
              <li><NavLink to="/orders" className={linkClass}>Orders</NavLink></li>
            )}

            <li>
              <NavLink
                to="/cart"
                className="relative inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Cart
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-red-600">
                  {cartCount}
                </span>
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="text-gray-700">Hi, {user.name}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600"
                >
                  Login
                </Link>
              </li>
            )}

            <li>
              <button
                onClick={toggleDark}
                aria-label="Toggle dark mode"
                className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                {dark ? "Light" : "Dark"}
              </button>
            </li>
          </ul>
        </nav>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-gray-200 bg-white md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3 text-sm font-semibold">
            <li>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                  status ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${status ? "bg-green-500" : "bg-gray-400"}`} />
                {status ? "Online" : "Offline"}
              </span>
            </li>

            {[
              { to: "/", label: "Home", end: true },
              { to: "/grocery", label: "Grocery" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/chat", label: "AI Chat" },
              { to: "/wishlist", label: `Favorites (${wishlistCount})` }
            ].map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 ${
                      isActive ? "bg-red-50 text-red-600" : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}

            {user && (
              <li>
                <NavLink
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
                >
                  My Orders
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg bg-red-600 px-3 py-2 text-white"
              >
                <span>Cart</span>
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-red-600">
                  {cartCount}
                </span>
              </NavLink>
            </li>

            <li className="flex gap-2 pt-1">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-700"
                >
                  Logout ({user.name})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center text-gray-700"
                >
                  Login
                </Link>
              )}

              <button
                onClick={toggleDark}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-700"
              >
                {dark ? "Light" : "Dark"}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
