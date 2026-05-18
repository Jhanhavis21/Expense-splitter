const User = require('../models/User');

const addFriend = async (req, res) => {
  try {
    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({ message: 'Friend ID is required' });
    }

    const user = await User.findById(req.userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    user.friends.push(friendId);
    friend.friends.push(req.userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend added', user: user.populate('friends', 'name email') });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add friend', error: error.message });
  }
};

const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('friends', 'name email avatar');
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch friends', error: error.message });
  }
};

const removeFriend = async (req, res) => {
  try {
    const { friendId } = req.body;

    const user = await User.findById(req.userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    user.friends = user.friends.filter(f => f.toString() !== friendId.toString());
    friend.friends = friend.friends.filter(f => f.toString() !== req.userId.toString());

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove friend', error: error.message });
  }
};

module.exports = {
  addFriend,
  getFriends,
  removeFriend,
};
