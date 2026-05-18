const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, getUserExpenses, deleteExpense } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addExpense);
router.get('/all', authMiddleware, getExpenses);
router.get('/my-expenses', authMiddleware, getUserExpenses);
router.delete('/:id', authMiddleware, deleteExpense);

module.exports = router;
