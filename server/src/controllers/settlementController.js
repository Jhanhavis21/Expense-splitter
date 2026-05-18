const Settlement = require('../models/Settlement');
const { calculateBalances } = require('../utils/calculations');

const getBalances = async (req, res) => {
  try {
    const balances = await calculateBalances(req.userId);
    res.status(200).json(balances);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch balances', error: error.message });
  }
};

const settlePayment = async (req, res) => {
  try {
    const { toUserId, amount } = req.body;

    if (!toUserId || !amount) {
      return res.status(400).json({ message: 'User ID and amount are required' });
    }

    const settlement = new Settlement({
      from: req.userId,
      to: toUserId,
      amount,
      settled: true,
      settledDate: new Date(),
    });

    await settlement.save();

    res.status(201).json({ message: 'Payment settled', settlement });
  } catch (error) {
    res.status(500).json({ message: 'Failed to settle payment', error: error.message });
  }
};

const getSettlements = async (req, res) => {
  try {
    const settlements = await Settlement.find({
      $or: [{ from: req.userId }, { to: req.userId }]
    })
      .populate('from', 'name email')
      .populate('to', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(settlements);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch settlements', error: error.message });
  }
};

module.exports = {
  getBalances,
  settlePayment,
  getSettlements,
};
