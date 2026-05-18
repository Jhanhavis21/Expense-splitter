const express = require('express');
const router = express.Router();
const { getBalances, settlePayment, getSettlements } = require('../controllers/settlementController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/balances', authMiddleware, getBalances);
router.post('/settle', authMiddleware, settlePayment);
router.get('/history', authMiddleware, getSettlements);

module.exports = router;
