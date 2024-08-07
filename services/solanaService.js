import axios from 'axios';
import { getSolanaPrice } from './getSolanaPrice.js';
import { convertCurrency } from '../utils/currencyConverter.js';



export const getAccountInfo = async (accountPublicKey) => {
    const SOLANA_BASE_URL = process.env.SOLANA_BASE_URL;
    const SOLANA_API_KEY = process.env.SOLANA_API_KEY;
    try {
        if (!SOLANA_BASE_URL || !SOLANA_API_KEY) {
            throw new Error('Missing SOLANA_BASE_URL or SOLANA_API_KEY');
        }

        const url = `${SOLANA_BASE_URL}${SOLANA_API_KEY}`;
        console.log('Request URL:', url);  // Debugging log

        const response = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "getAccountInfo",
            params: [accountPublicKey]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SOLANA_API_KEY}`
            }
        });

        if (response.data.error) {
            throw new Error(response.data.error.message);
        }

        return response.data.result;
    } catch (error) {
        console.error('Request error:', error);
        throw new Error('Failed to fetch account info');
    }
};
export const processUPIPayment = async (amount, currency) => {
    try {
        const solPrice = await getSolanaPrice();
        const convertedAmount = await convertCurrency(amount, currency, 'SOL');
        return { message: 'UPI payment successful', solAmount: convertedAmount };
    } catch (error) {
        console.error('Failed to process UPI payment:', error);
        throw new Error('Failed to process UPI payment');
    }
};

export const processCardPayment = async (amount, currency) => {
    try {
        const solPrice = await getSolanaPrice();
        const convertedAmount = await convertCurrency(amount, currency, 'SOL');
        return { message: 'Card payment successful', solAmount: convertedAmount };
    } catch (error) {
        console.error('Failed to process card payment:', error);
        throw new Error('Failed to process card payment');
    }
};
