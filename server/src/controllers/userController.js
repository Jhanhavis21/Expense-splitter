const User = require('../models/User');
const { calculateBalances } = require('../utils/calculations');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password').populate('friends', 'name email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const balances = await calculateBalances(req.userId);
    res.status(200).json({ user, balances });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
    res.status(200).json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email avatar').limit(20);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
};
