import React from "react";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            form: { email: "", subject: "", message: "" },
            sent: false,
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

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, message } = this.state.form;
        if (!email || !message) {
            this.setState({ error: "Email and message are required." });
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            this.setState({ error: "Please enter a valid email." });
            return;
        }
        this.setState({
            sent: true,
            error: "",
            form: { email: "", subject: "", message: "" }
        });
    };

    render() {
        const { avatar_url, name, login, bio, html_url } = this.state.data || {};
        const { form, sent, error } = this.state;

        return (
            <section className="bg-gradient-to-b from-orange-50/60 via-white to-white">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:py-16 lg:grid-cols-[1fr_1.1fr]">
                    {/* Profile / info */}
                    <aside className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-200">
                            Get in touch
                        </p>
                        <h1 className="mt-3 text-3xl font-black md:text-4xl">
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
                                            className="mt-1 inline-block text-xs font-semibold text-orange-300 underline"
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

                    {/* Form */}
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
                                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
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
                                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
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
                                    className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
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
                            className="mt-6 w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                        >
                            Send message
                        </button>
                    </form>
                </div>
            </section>
        );
    }
}

export default Contact;
