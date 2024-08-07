import { processUPIPayment, processCardPayment } from '../services/solanaService.js';

export const buySolanaWithUPI = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const result = await processUPIPayment(amount, currency);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error processing UPI payment:', error);
        res.status(500).json({ error: error.message });
    }
};

export const buySolanaWithCard = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const result = await processCardPayment(amount, currency);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error processing card payment:', error);
        res.status(500).json({ error: error.message });
    }
};
