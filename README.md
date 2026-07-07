# YumRun

A food delivery app I built with React while learning. You can browse recipes, add stuff to a cart or wishlist, place an order, and there's also an AI chat that answers food questions (uses the Groq API).

Live demo: https://yumrun-2e144.web.app

Repo: https://github.com/zaid154/Food-App

## What it does

- Home page with recipe cards, search and a few filters
- Restaurant/recipe detail page with ingredients and cooking steps
- Cart + wishlist (Redux), counts show up in the header
- "Buy now" that skips the cart and goes straight to checkout
- Login / register (stored in localStorage) and protected checkout + orders pages
- Grocery page (lazy loaded)
- AI chat at `/chat` - English, Hindi and Spanish
- Dark mode toggle and an online/offline indicator

## Tech

React 18, Parcel, React Router, Redux Toolkit, Tailwind, and the OpenAI SDK pointed at Groq. Tests with Jest + React Testing Library.

## Running it

You'll need Node 18+.

```bash
npm install
npm start
```

Then open http://localhost:1234

For the AI chat to work you need a Groq key. Copy `.env.example` to `.env` and put your key in it:

```
Gemini_api=your_key_here
```

Get a free key from https://console.groq.com. Don't commit the `.env` file.

## Other commands

```bash
npm run build   # production build
npm test        # run tests
```

## Deployment

Hosted on Firebase Hosting. The build goes to `dist/` and `firebase.json` has a SPA rewrite so client-side routes (like `/cart`, `/about`) don't 404 on refresh.

To deploy your own copy:

```bash
npm install -g firebase-tools   # one time
firebase login                  # one time
npm run build
firebase deploy --only hosting
```

The Firebase project config lives in `src/utils/firebase.js`. The web config (apiKey etc.) is meant to be public - real security comes from Firebase Security Rules, not from hiding these values.

## Folder layout

Most of the code is in `src/Component` (the pages/components) and `src/utils` (Redux store, slices, constants). `App.js` has the routing.

```
YumRun/
├─ App.js              # routes + app shell
├─ App.css             # Tailwind + global styles
├─ index.html          # entry HTML
├─ firebase.json       # Firebase Hosting config
├─ src/
│  ├─ Component/       # pages & UI components
│  ├─ utils/           # Redux store, slices, constants, firebase config
│  └─ mockData/        # test mock data
└─ dist/               # production build output
```

## Author

Zaid - https://github.com/zaid154
