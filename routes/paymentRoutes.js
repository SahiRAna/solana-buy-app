import express from 'express';
import { buySolanaWithUPI, buySolanaWithCard } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/upi', buySolanaWithUPI);
router.post('/card', buySolanaWithCard);

export default router;
