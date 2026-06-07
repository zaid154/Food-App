import { useState, useContext } from "react";
import { LOGO } from "./../utils/Constants";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";
import UserContext from "./Usercontext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const status = useOnline();
  const navigate = useNavigate();

  // get logged-in user from context
  const { user, setUser } = useContext(UserContext);

  const toggleDark = () => {
    document.body.classList.toggle("dark");
    setDark((d) => !d);
  };

  // when user clicks logout, clear it from localStorage and context
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
    navigate("/login");
  };

  const cartItem = useSelector((state) => state.cart.item);
  const cartCount = cartItem.reduce((n, i) => n + (i.quantity || 1), 0);

  const wishlistItem = useSelector((state) => state.wishlist.item);
  const wishlistCount = wishlistItem.length;

  const linkClass = ({ isActive }) =>
    `relative px-1 py-1 transition-colors hover:text-orange-500 ${
      isActive ? "text-orange-600 after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-orange-500" : "text-slate-700"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={LOGO} alt="YumRun logo" className="h-10 w-10 object-contain" />
          <span className="hidden text-xl font-extrabold tracking-tight text-slate-900 sm:inline">
            Yum<span className="text-orange-500">Run</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-semibold">
            <li>
              <span
                title={status ? "Online" : "Offline"}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                  status ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${status ? "bg-green-500" : "bg-red-500"}`}
                />
                {status ? "Online" : "Offline"}
              </span>
            </li>
            <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
            <li><NavLink to="/grocery" className={linkClass}>Grocery</NavLink></li>
            <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
            <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
            <li><NavLink to="/chat" className={linkClass}>AI Chat</NavLink></li>

            {/* wishlist link with count */}
            <li>
              <NavLink to="/wishlist" className={linkClass}>
                ❤️ {wishlistCount}
              </NavLink>
            </li>

            {/* orders link, only when logged in */}
            {user && (
              <li><NavLink to="/orders" className={linkClass}>Orders</NavLink></li>
            )}

            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    isActive ? "bg-orange-500 text-white" : "bg-slate-900 text-white hover:bg-slate-800"
                  }`
                }
              >
                Cart
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1.5 text-xs font-bold text-slate-950">
                  {cartCount}
                </span>
              </NavLink>
            </li>

            {/* show login button or username + logout */}
            {user ? (
              <>
                <li className="text-slate-700">Hi, {user.name}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-700 hover:border-orange-300 hover:text-orange-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-700 hover:border-orange-300 hover:text-orange-600"
                >
                  Login
                </Link>
              </li>
            )}

            <li>
              <button
                onClick={toggleDark}
                aria-label="Toggle dark mode"
                className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
              >
                {dark ? "Light" : "Dark"}
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile toggle */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-3 text-sm font-semibold">
            <li>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                  status ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${status ? "bg-green-500" : "bg-red-500"}`} />
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
                      isActive ? "bg-orange-50 text-orange-600" : "text-slate-700 hover:bg-slate-50"
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
                  className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  My Orders
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2 text-white"
              >
                <span>Cart</span>
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1.5 text-xs font-bold text-slate-950">
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
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-700"
                >
                  Logout ({user.name})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-center text-slate-700"
                >
                  Login
                </Link>
              )}

              <button
                onClick={toggleDark}
                className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-white"
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
