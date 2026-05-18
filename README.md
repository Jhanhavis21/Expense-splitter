# 💸 MERN Expense Splitter

A full-stack MERN (MongoDB, Express, React, Node.js) application for splitting expenses among friends with real-time balance tracking.

## 🌟 Features

- **User Authentication** - Secure JWT-based authentication
- **Expense Management** - Add and split expenses with friends
- **Friend Management** - Add and manage your friend list
- **Balance Tracking** - Real-time tracking of who owes whom
- **Settlement History** - Track all payments and settlements
- **Dashboard** - Overview of expenses and balances
- **Responsive Design** - Works on desktop and mobile devices

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fsd\ project
```

### 2. Install Root Dependencies
```bash
npm run install-all
```

This will install dependencies for the root, server, and client folders.

### 3. Setup Backend

#### 3.1 Create `.env` file in `/server` directory:
```bash
cp server/.env.example server/.env
```

#### 3.2 Update the `.env` file with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/expense-splitter
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/expense-splitter

PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 4. Start MongoDB

**For Local MongoDB:**
```bash
mongod
```

**For MongoDB Atlas:**
- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `.env`

### 5. Start the Development Servers

#### Option 1: Run both servers concurrently
From the root directory:
```bash
npm start
```

#### Option 2: Run servers separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The backend will run on `http://localhost:5000`
The frontend will run on `http://localhost:5173`

## 🏗️ Project Structure

```
fsd project/
├── server/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Main server file
│   ├── package.json
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   ├── context/         # React context
│   │   ├── App.jsx          # Main App component
│   │   └── index.css        # Tailwind CSS
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── package.json
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/all` - Get all users

### Expenses
- `POST /api/expenses/add` - Add new expense
- `GET /api/expenses/all` - Get all expenses
- `GET /api/expenses/my-expenses` - Get user's expenses
- `DELETE /api/expenses/:id` - Delete expense

### Friends
- `POST /api/friends/add` - Add a friend
- `GET /api/friends/my-friends` - Get user's friends
- `POST /api/friends/remove` - Remove a friend

### Settlements
- `GET /api/settlements/balances` - Get balance summary
- `POST /api/settlements/settle` - Record a payment
- `GET /api/settlements/history` - Get settlement history

## 🎯 Usage Guide

### 1. Register an Account
- Navigate to the registration page
- Enter your name, email, and password
- Submit to create your account

### 2. Add Friends
- Go to Friends page
- Find other users and click "Add"
- They will be added to your friend list

### 3. Add an Expense
- Click "Add Expense"
- Enter expense details (title, amount, category)
- Distribute the amount among participants
- Submit to add the expense

### 4. Track Balances
- Dashboard shows real-time balances
- Green indicates money owed to you
- Red indicates money you owe
- Settlements page shows detailed history

### 5. Settle Payments
- Go to Settlements page
- Select friend and amount
- Record the payment
- Payment is added to history

## 🛠️ Technology Stack

### Frontend
- React 18 with Vite
- React Router DOM for navigation
- Axios for API calls
- Tailwind CSS for styling

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing

### Database
- MongoDB (NoSQL database)
- Collections: Users, Expenses, Settlements

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes
- CORS configuration
- Input validation

## 📝 Notes

- All expenses are tied to the user who added them
- Balances are calculated automatically based on expenses
- Shared expenses can only be deleted by the person who paid
- Settlement history is permanent and cannot be deleted

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (`mongod` for local)
- Check MongoDB URI in `.env`
- For Atlas, whitelist your IP address

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.js`

### CORS Error
- Ensure backend is running on `http://localhost:5000`
- Check CORS configuration in `server/src/server.js`

## 📦 Building for Production

```bash
# Build frontend
cd client
npm run build

# Build backend (if needed)
cd server
npm run build
```

## 📄 License

MIT License - feel free to use this project for learning and development

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests!

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy expense tracking!** 💰
