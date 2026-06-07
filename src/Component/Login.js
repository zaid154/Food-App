import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./Usercontext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            setError("Please fill all fields");
            return;
        }

        // read users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // find a user with matching email and password
        const found = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!found) {
            setError("Wrong email or password");
            return;
        }

        // save logged-in user info so refresh keeps user signed in
        const loggedUser = {
            id: found.id,
            name: found.name,
            email: found.email
        };
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

        // update context so header changes right away
        setUser(loggedUser);

        navigate("/");
    };

    return (
        <section className="flex min-h-[80vh] items-center justify-center bg-orange-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Login to continue ordering.
                </p>

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-400"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-400"
                            placeholder="Enter password"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-orange-600">
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
