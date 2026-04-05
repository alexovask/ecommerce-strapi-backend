# 🛒 E-commerce Backend (Strapi + Stripe)

Backend for an e-commerce platform built with **Strapi v5**, featuring authentication, address management, and payment processing with **Stripe**.

---

## 🚀 Features

- 🔐 JWT Authentication
- 👤 User management
- 📦 Address CRUD (linked to authenticated users)
- 💳 Stripe payment integration (sandbox/testing)
- 🧩 Custom controllers & services
- 🔒 Secure environment configuration

---

## 🛠 Tech Stack

- **Strapi v5**
- **Node.js**
- **SQLite / PostgreSQL**
- **Stripe API**

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```env
STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=
DATABASE_URL=
JWT_SECRET=
