import React, { useEffect, useState } from 'react';
import { userService, expenseService, settlementService, friendService } from '../services/api';
import { ExpenseCard } from '../components/ExpenseCard';
import { BalanceCard } from '../components/BalanceCard';

export const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState({});
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, expenseRes, balanceRes, friendRes] = await Promise.all([
          userService.getProfile(),
          expenseService.getUserExpenses(),
          settlementService.getBalances(),
          friendService.getFriends(),
        ]);

        setUser(userRes.data.user);
        setExpenses(expenseRes.data);
        setBalances(balanceRes.data);
        setFriends(friendRes.data);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  const totalOwed = Object.values(balances).reduce((sum, amount) => sum + (amount > 0 ? amount : 0), 0);
  const totalOwes = Math.abs(Object.values(balances).reduce((sum, amount) => sum + (amount < 0 ? amount : 0), 0));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}!</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg">
          <p className="text-gray-600 text-sm">Total Owed to You</p>
          <p className="text-3xl font-bold text-green-600">${totalOwed.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg">
          <p className="text-gray-600 text-sm">Total You Owe</p>
          <p className="text-3xl font-bold text-red-600">${totalOwes.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg">
          <p className="text-gray-600 text-sm">Total Expenses</p>
          <p className="text-3xl font-bold text-blue-600">${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
          {expenses.length > 0 ? (
            expenses.slice(0, 5).map((expense) => (
              <ExpenseCard key={expense._id} expense={expense} />
            ))
          ) : (
            <p className="text-gray-600">No expenses yet</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Balance Summary</h2>
          {friends.length > 0 ? (
            friends.map((friend) => (
              <BalanceCard
                key={friend._id}
                friend={friend}
                owedAmount={balances[friend._id] || 0}
              />
            ))
          ) : (
            <p className="text-gray-600">Add friends to see balances</p>
          )}
        </div>
      </div>
    </div>
  );
};
