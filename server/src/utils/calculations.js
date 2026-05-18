const Settlement = require('../models/Settlement');
const Expense = require('../models/Expense');

const calculateBalances = async (userId) => {
  try {
    // Find all expenses where the user is involved
    const expensesAsPayer = await Expense.find({ 'paidBy': userId });
    const expensesAsParticipant = await Expense.find({ 'group.user': userId });

    let balances = {}; // { friendId: amount (positive = they owe you, negative = you owe them) }

    // Process expenses where user paid
    for (const expense of expensesAsPayer) {
      for (const participant of expense.group) {
        if (participant.user.toString() !== userId.toString()) {
          const friendId = participant.user.toString();
          if (!balances[friendId]) balances[friendId] = 0;
          balances[friendId] += participant.share; // They owe the user
        }
      }
    }

    // Process expenses where user participated but didn't pay
    for (const expense of expensesAsParticipant) {
      const friendId = expense.paidBy.toString();
      const userShare = expense.group.find(g => g.user.toString() === userId.toString())?.share || 0;
      
      if (!balances[friendId]) balances[friendId] = 0;
      balances[friendId] -= userShare; // User owes the friend
    }

    return balances;
  } catch (error) {
    console.error('Error calculating balances:', error);
    return {};
  }
};

module.exports = {
  calculateBalances,
};
