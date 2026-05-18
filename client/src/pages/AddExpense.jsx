import React, { useState, useEffect } from 'react';
import { expenseService, friendService, userService } from '../services/api';

export const AddExpense = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    category: 'Other',
  });
  const [group, setGroup] = useState([]);
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const [userRes, friendRes] = await Promise.all([
          userService.getProfile(),
          friendService.getFriends(),
        ]);
        setUser(userRes.data.user);
        setFriends(friendRes.data);
        
        // Initialize group with current user and friends
        const initialGroup = [
          { user: userRes.data.user._id, name: userRes.data.user.name, share: 0 },
          ...friendRes.data.map(f => ({ user: f._id, name: f.name, share: 0 }))
        ];
        setGroup(initialGroup);
      } catch (err) {
        console.error('Failed to fetch friends', err);
      }
    };

    fetchFriends();
  }, []);

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGroupChange = (index, share) => {
    const newGroup = [...group];
    newGroup[index].share = parseFloat(share) || 0;
    setGroup(newGroup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        group: group.filter(g => g.share > 0).map(({ user, share }) => ({ user, share })),
      };

      await expenseService.addExpense(expenseData);
      alert('Expense added successfully!');
      setFormData({ title: '', description: '', amount: '', category: 'Other' });
      setGroup(group.map(g => ({ ...g, share: 0 })));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = parseFloat(formData.amount) || 0;
  const totalShare = group.reduce((sum, g) => sum + g.share, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add Expense</h1>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="card">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleAddChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleAddChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleAddChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleAddChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Accommodation</option>
                <option>Entertainment</option>
                <option>Utilities</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4">Split Amount</h3>
            <div className="space-y-3">
              {group.map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-32">{member.name}</span>
                  <input
                    type="number"
                    value={member.share}
                    onChange={(e) => handleGroupChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                    step="0.01"
                    placeholder="Amount"
                  />
                </div>
              ))}
            </div>
            <p className={`mt-4 font-bold ${totalShare === totalAmount ? 'text-green-600' : 'text-red-600'}`}>
              Total: ${totalShare.toFixed(2)} / ${totalAmount.toFixed(2)}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || totalShare !== totalAmount}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </form>
      </div>
    </div>
  );
};
