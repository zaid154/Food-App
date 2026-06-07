import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || password === "") {
            setError("Please fill all fields");
            return;
        }

        if (password.length < 4) {
            setError("Password must be at least 4 characters");
            return;
        }

        // get old users list from localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // check if email already used
        const found = users.find((u) => u.email === email);
        if (found) {
            setError("This email is already registered");
            return;
        }

        // make new user and save
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created! Please login now.");
        navigate("/login");
    };

    return (
        <section className="flex min-h-[80vh] items-center justify-center bg-orange-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Sign up to order and save your favorite recipes.
                </p>

                <form onSubmit={handleRegister} className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-orange-400"
                            placeholder="Your name"
                        />
                    </div>

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
                            placeholder="At least 4 characters"
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
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-orange-600">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
