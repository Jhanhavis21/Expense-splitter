import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', avatar: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userService.getProfile();
        setUser(res.data.user);
        setFormData({ name: res.data.user.name, avatar: res.data.user.avatar });
      } catch (err) {
        console.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userService.updateProfile(formData);
      setUser(res.data.user);
      setEditMode(false);
      alert('Profile updated!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!user) return <div className="text-center py-8">User not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        {!editMode ? (
          <div className="card">
            <div className="text-center mb-6">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
              )}
              <p className="text-2xl font-bold">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="w-full btn-primary"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Avatar URL</label>
              <input
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-600"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="flex-1 btn-primary">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
