import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import paymentRoutes from './routes/paymentRoutes.js';

import { getAccountInfo } from './services/solanaService.js';
import { accountPublicKey } from './config.js';

// Function to fetch and log account info
const fetchAndLogAccountInfo = async () => {
    try {
        const accountInfo = await getAccountInfo(accountPublicKey);
        console.log('Account Info:', accountInfo);
    } catch (error) {
        console.error('Failed to fetch account info:', error.message);
    }
};

// Create an Express application
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/api/payments', paymentRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    // Log the environment variables
    const SOLANA_BASE_URL = process.env.SOLANA_BASE_URL;
    const SOLANA_API_KEY = process.env.SOLANA_API_KEY;
    const SOLANA_RPC_URL = `${SOLANA_BASE_URL}${SOLANA_API_KEY}`;
    console.log('SOLANA_BASE_URL:', SOLANA_BASE_URL);
    console.log('SOLANA_API_KEY:', SOLANA_API_KEY);
    console.log('SOLANA_RPC_URL:', SOLANA_RPC_URL);

    // Fetch and log the Solana account info
    fetchAndLogAccountInfo();
});
