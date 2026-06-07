# YumRun — Food Delivery App

A full-featured food delivery web application built with React. Browse restaurants, manage your cart and wishlist, place orders, and chat with an AI food assistant powered by Groq.

**Live repo:** [github.com/zaid154/Food-App](https://github.com/zaid154/Food-App)

---

## Features

### Restaurant & Food
- Browse restaurants and menus on the home page
- View detailed restaurant/product pages (`/restaurant/:id`)
- Add items to cart with quantity controls
- Grocery section with lazy loading (`/grocery`)

### Cart & Checkout
- Redux-powered cart with item count in header
- Checkout flow for logged-in users (`/checkout`)
- Order history page (`/orders`)

### User Authentication
- Register and login (`/register`, `/login`)
- Session persisted in `localStorage`
- Protected routes for checkout and orders

### Wishlist
- Save favorite items (`/wishlist`)
- Wishlist count shown in navigation

### AI Food Assistant
- Groq-powered chat at `/chat` (Llama 3.3 70B)
- Multi-language support: English, Hindi, Spanish
- Ask about recipes, restaurants, and food recommendations

### UI/UX
- Responsive header with mobile menu
- Dark mode toggle
- Online/offline status indicator
- Tailwind CSS styling with shimmer loading states

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 |
| Bundler | Parcel 2 |
| Routing | React Router v6 |
| State | Redux Toolkit |
| Styling | Tailwind CSS 4 |
| AI | Groq API (OpenAI SDK) |
| Testing | Jest + React Testing Library |

---

## Project Structure

```
Food-App/
├── App.js                 # Root layout, routing, Redux provider
├── index.html
├── src/
│   ├── Component/
│   │   ├── Cart.js            # Home — restaurant listing
│   │   ├── ProductView.js     # Restaurant menu detail
│   │   ├── addToCart.js       # Cart page
│   │   ├── Checkout.js        # Checkout flow
│   │   ├── Orders.js          # Order history
│   │   ├── Login.js           # User login
│   │   ├── Register.js        # User registration
│   │   ├── Wishlist.js        # Saved favorites
│   │   ├── ChatGptModel.js    # AI chat assistant
│   │   ├── ProtectedRoute.js  # Auth guard
│   │   ├── Header.js          # Navigation
│   │   ├── Grocery.js         # Grocery section (lazy)
│   │   └── ...
│   └── utils/
│       ├── Store.js           # Redux store
│       ├── cartSlice.js       # Cart state
│       ├── wishlistSlice.js   # Wishlist state
│       ├── ordersSlice.js     # Orders state
│       ├── Constants.js       # App constants & API config
│       └── constToggle.js     # Chat translations (EN/HI/ES)
└── .env.example               # Environment variable template
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/zaid154/Food-App.git
cd Food-App
npm install
```

### Environment Setup

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Get a free API key from [console.groq.com](https://console.groq.com)
3. Add it to `.env`:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

> **Never commit `.env`** — it is listed in `.gitignore`.

### Run Development Server

```bash
npm start
```

Open [http://localhost:1234](http://localhost:1234)

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

---

## Routes

| Path | Page | Auth Required |
|------|------|---------------|
| `/` | Home (Restaurants) | No |
| `/restaurant/:id` | Restaurant Menu | No |
| `/cart` | Shopping Cart | No |
| `/wishlist` | Wishlist | No |
| `/grocery` | Grocery | No |
| `/chat` | AI Food Assistant | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/checkout` | Checkout | Yes |
| `/orders` | Order History | Yes |
| `/about` | About | No |
| `/contact` | Contact | No |

---

## Author

**Zaid** — [GitHub @zaid154](https://github.com/zaid154)

---

## License

ISC
