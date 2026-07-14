import React from "react";
import { FORMSPREE_ENDPOINT } from "../utils/Constants";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            form: { email: "", subject: "", message: "" },
            sent: false,
            sending: false,
            error: ""
        };
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = async () => {
        try {
            const res = await fetch("https://api.github.com/users/zaid154");
            const json = await res.json();
            this.setState({ data: json });
        } catch (e) {
            // ignore — non-blocking
        }
    };

    handleChange = (key) => (e) => {
        this.setState({ form: { ...this.state.form, [key]: e.target.value }, sent: false, error: "" });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, subject, message } = this.state.form;
        if (!email || !message) {
            this.setState({ error: "Email and message are required." });
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            this.setState({ error: "Please enter a valid email." });
            return;
        }
        if (!FORMSPREE_ENDPOINT) {
            this.setState({
                error: "Contact form is not configured. Add FORMSPREE_ENDPOINT to your .env and restart."
            });
            return;
        }

        this.setState({ sending: true, error: "", sent: false });

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ email, subject, message })
            });

            if (res.ok) {
                this.setState({
                    sent: true,
                    sending: false,
                    form: { email: "", subject: "", message: "" }
                });
            } else {
                const data = await res.json().catch(() => ({}));
                const msg =
                    data?.errors?.map((x) => x.message).join(", ") ||
                    "Couldn't send your message. Please try again.";
                this.setState({ error: msg, sending: false });
            }
        } catch (err) {
            this.setState({ error: "Network error. Please try again.", sending: false });
        }
    };

    render() {
        const { avatar_url, name, login, bio, html_url } = this.state.data || {};
        const { form, sent, sending, error } = this.state;

        return (
            <section className="bg-gray-50">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:py-16 lg:grid-cols-[1fr_1.1fr]">
                    <aside className="rounded-2xl bg-gray-900 p-8 text-white">
                        <p className="text-sm font-semibold text-red-400">
                            Get in touch
                        </p>
                        <h1 className="mt-2 text-2xl font-bold md:text-3xl">
                            We'd love to hear from you.
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                            Got a question, suggestion, or partnership idea? Send us a note —
                            we read every message.
                        </p>

                        {avatar_url && (
                            <div className="mt-7 flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                                <img src={avatar_url} alt={name || login} className="h-14 w-14 rounded-full" />
                                <div>
                                    <p className="text-sm font-semibold">{name || login}</p>
                                    {bio && <p className="text-xs text-slate-300">{bio}</p>}
                                    {html_url && (
                                        <a
                                            href={html_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-1 inline-block text-xs font-semibold text-red-300 underline"
                                        >
                                            github.com/{login}
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        <ul className="mt-8 space-y-3 text-sm text-slate-200">
                            <li>📧 hello@yumrun.example</li>
                            <li>📞 +91 99999 99999</li>
                            <li>📍 Delhi, India</li>
                        </ul>
                    </aside>

                    <form
                        onSubmit={this.handleSubmit}
                        className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            We usually reply within 1 business day.
                        </p>

                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={this.handleChange("email")}
                                    placeholder="you@example.com"
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-400"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={form.subject}
                                    onChange={this.handleChange("subject")}
                                    placeholder="What's it about?"
                                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-400"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    value={form.message}
                                    onChange={this.handleChange("message")}
                                    placeholder="Tell us a bit more..."
                                    className="mt-1 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-400"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
                        )}
                        {sent && (
                            <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                                ✓ Thanks! Your message has been sent.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={sending}
                            className="mt-6 w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                        >
                            {sending ? "Sending..." : "Send message"}
                        </button>
                    </form>
                </div>
            </section>
        );
    }
}

export default Contact;
