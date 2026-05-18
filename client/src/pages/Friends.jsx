import React, { useState, useEffect } from 'react';
import { friendService, userService } from '../services/api';
import { FriendCard } from '../components/FriendCard';

export const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [friendRes, usersRes] = await Promise.all([
          friendService.getFriends(),
          userService.getAllUsers(),
        ]);
        setFriends(friendRes.data);
        setAllUsers(usersRes.data);
      } catch (err) {
        setError('Failed to load friends');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddFriend = async (userId) => {
    try {
      await friendService.addFriend({ friendId: userId });
      alert('Friend added!');
      const updatedFriends = await friendService.getFriends();
      setFriends(updatedFriends.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add friend');
    }
  };

  const handleRemoveFriend = async (userId) => {
    if (window.confirm('Are you sure you want to remove this friend?')) {
      try {
        await friendService.removeFriend({ friendId: userId });
        const updatedFriends = await friendService.getFriends();
        setFriends(updatedFriends.data);
      } catch (err) {
        alert('Failed to remove friend');
      }
    }
  };

  const friendIds = friends.map(f => f._id);
  const availableUsers = allUsers.filter(u => !friendIds.includes(u._id));

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Friends</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Friends</h2>
          {friends.length > 0 ? (
            friends.map(friend => (
              <FriendCard
                key={friend._id}
                friend={friend}
                onRemove={handleRemoveFriend}
              />
            ))
          ) : (
            <p className="text-gray-600">No friends yet</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Add Friends</h2>
          {availableUsers.length > 0 ? (
            availableUsers.map(user => (
              <div key={user._id} className="card mb-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={() => handleAddFriend(user._id)}
                  className="btn-primary text-sm"
                >
                  Add
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">All users are already your friends</p>
          )}
        </div>
      </div>
    </div>
  );
};
