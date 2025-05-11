# Thimar: Omani Marketplace (University Project)

## Overview

**Thimar** is a prototype mobile/web application for an Omani marketplace, developed as a university project. The main goal is to demonstrate proficiency in using **React** and **React Native** (with Expo), focusing on UI/UX and application structure.  
**Note:** This project does **not** use any backend or database. All data is static and stored as dummy data within the project files.

---

## Project Purpose

- **Educational:** Built for a university assignment to showcase skills in React, React Native, and Expo.
- **Omani Market Focus:** The app simulates a marketplace for Omani agricultural products and sellers.
- **No Real Backend:** All data is hardcoded; there is no real authentication, payment, or persistent storage.

---

## Dummy Data

All marketplace data (products, sellers, categories) is stored as static TypeScript files in the `data/` directory:

- `data/products.ts` — Contains an array of Omani products (e.g., dates, bananas, limes) with details like price, description, nutrition, etc.
- `data/sellers.ts` — Contains an array of sellers, each with info such as name, bio, rating, and location.
- `data/categories.ts` — Contains product categories (e.g., Dates, Bananas, Limes).

You can modify or extend these files to change the data shown in the app.

---

## Project Structure

```
.
├── app/                # Main application screens and navigation
│   ├── (tabs)/         # Main tab screens (Home, Profile, Cart, Categories)
│   ├── product/        # Product detail screens
│   ├── seller/         # Seller profile screens
│   ├── _layout.tsx     # App layout and navigation stack
│   └── success.tsx     # Order success/confirmation screen
│
├── assets/             # Images and static assets
│
├── components/         # Reusable UI components (Button, ProductCard, etc.)
│
├── context/            # React context providers (e.g., CartContext)
│
├── data/               # Dummy data (products, sellers, categories)
│
├── hooks/              # Custom React hooks
│
├── styles/             # Theme and style definitions
│
├── utils/              # Utility/helper functions
│
├── package.json        # Project dependencies and scripts
├── app.json            # Expo configuration
├── tsconfig.json       # TypeScript configuration
└── .prettierrc         # Code formatting rules
```

---

## How to Run

1. **Install dependencies:**  
   ```bash
   npm install
   ```
2. **Start the Expo development server:**  
   ```bash
   npm run dev
   ```
3. **Open in Expo Go (mobile) or web browser.**

---

## Key Features

- Browse Omani products by category
- View product details and nutrition info
- View seller profiles
- Add products to cart (cart state is local only)
- Simple, modern UI with Omani branding

---

## Notes

- **No real data:** All marketplace data is static and for demonstration only.
- **No backend:** There is no user authentication, order processing, or real checkout.
- **For learning purposes only.**

---