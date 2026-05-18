import React, { useState, useEffect } from 'react';
import { settlementService, friendService } from '../services/api';

export const Settlements = () => {
  const [balances, setBalances] = useState({});
  const [settlements, setSettlements] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balRes, settleRes, friendRes] = await Promise.all([
          settlementService.getBalances(),
          settlementService.getSettlements(),
          friendService.getFriends(),
        ]);
        setBalances(balRes.data);
        setSettlements(settleRes.data);
        setFriends(friendRes.data);
      } catch (err) {
        console.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSettle = async (e) => {
    e.preventDefault();
    if (!selectedFriend || !amount) {
      alert('Please select friend and amount');
      return;
    }

    try {
      await settlementService.settlePayment({
        toUserId: selectedFriend,
        amount: parseFloat(amount),
      });
      alert('Payment settled!');
      setAmount('');
      setSelectedFriend('');
      // Refresh data
      const balRes = await settlementService.getBalances();
      setBalances(balRes.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to settle payment');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settlements</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Settle a Payment</h2>
          <form onSubmit={handleSettle} className="card">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Friend</label>
              <select
                value={selectedFriend}
                onChange={(e) => setSelectedFriend(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                required
              >
                <option value="">Select a friend...</option>
                {friends.map(friend => (
                  <option key={friend._id} value={friend._id}>
                    {friend.name} ({friend.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Settle Payment
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Settlement History</h2>
          {settlements.length > 0 ? (
            <div className="space-y-3">
              {settlements.map(settle => (
                <div key={settle._id} className="card">
                  <p className="text-sm">
                    <strong>{settle.from?.name}</strong> paid{' '}
                    <strong>${settle.amount.toFixed(2)}</strong> to{' '}
                    <strong>{settle.to?.name}</strong>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(settle.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No settlements yet</p>
          )}
        </div>
      </div>
    </div>
  );
};
