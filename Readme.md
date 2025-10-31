# Simupay

## About

SimuPay is a full-stack payment platform that allows users to create and manage payment links, perform transactions, and manage wallets in a secure and efficient manner. It is designed to simulate a real-world payment system and can be used for testing, learning, or as a prototype for digital payment solutions.

### The project combines:

- - A Vite + React frontend for a fast, responsive user interface

- - An Express backend that handles API requests, database connections, and user authentication

- - A MongoDB database to store user data, transactions, and wallet information

SimuPay is structured to run in a single server deployment, meaning both frontend and backend are served together without using serverless functions.

### Features

- - User Management: Sign up, log in, and manage user profiles
- - Wallets: Create, fund, and track digital wallets
- - Transactions: Send, receive, and track payments
- - Payment Links: Generate payment links for customers or clients
- - Secure Cookies & JWT Authentication for user sessions
- - CORS-enabled for frontend-backend communication during development
- - Static Serving of Frontend in Production with catch-all routing to handle  refreshing on routes
- - Content Security Policy (CSP) configured for secure loading of external  resources like Google Fonts
- - Vite Frontend: Lightning-fast development and optimized production build