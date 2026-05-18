const Expense = require('../models/Expense');
const User = require('../models/User');

const addExpense = async (req, res) => {
  try {
    const { title, description, amount, category, group } = req.body;

    // Validation
    if (!title || !amount || !group || group.length === 0) {
      return res.status(400).json({ message: 'Title, amount, and group are required' });
    }

    // Validate group shares
    const totalShare = group.reduce((sum, item) => sum + (item.share || 0), 0);
    if (totalShare !== amount) {
      return res.status(400).json({ message: 'Group shares must equal the total amount' });
    }

    const expense = new Expense({
      title,
      description: description || '',
      amount,
      category: category || 'Other',
      paidBy: req.userId,
      group,
    });

    await expense.save();
    await expense.populate('paidBy', 'name email');
    await expense.populate('group.user', 'name email');

    res.status(201).json({ message: 'Expense added', expense });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add expense', error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate('paidBy', 'name email')
      .populate('group.user', 'name email')
      .sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
  }
};

const getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      $or: [
        { paidBy: req.userId },
        { 'group.user': req.userId }
      ]
    })
      .populate('paidBy', 'name email')
      .populate('group.user', 'name email')
      .sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.paidBy.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this expense' });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense', error: error.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  getUserExpenses,
  deleteExpense,
};
