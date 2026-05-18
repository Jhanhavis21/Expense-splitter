# MERN Expense Splitter - Project Guidelines

## Project Overview
A full-stack MERN application for splitting expenses among friends with real-time balance tracking.

## Architecture
- **Frontend**: React with Vite, React Router, Tailwind CSS
- **Backend**: Node.js with Express, MongoDB, JWT authentication
- **Database**: MongoDB with Mongoose ODM

## Development Setup
1. Install dependencies: `npm install` in both `/server` and `/client`
2. Create `.env` files in `/server` (MongoDB URI, JWT secret)
3. Run development servers: Backend on port 5000, Frontend on port 5173
4. MongoDB connection required for database operations

## Key Features
- User authentication with JWT
- Add and split expenses
- Friend management
- Automatic settlement calculations
- Transaction history
- Dashboard with balance summary
