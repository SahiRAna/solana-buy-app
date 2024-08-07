import axios from 'axios'; // Ensure you have installed axios with `npm install axios`

const API_URL = 'https://api.coingecko.com/api/v3/simple/price'; // Example API endpoint

/**
 * Fetches the current price of Solana (SOL) in USD.
 * @returns {Promise<number>} The current price of Solana (SOL) in USD.
 */
export async function getSolanaPrice() {
    try {
        const response = await axios.get(API_URL, {
            params: {
                ids: 'solana',
                vs_currencies: 'usd'
            }
        });

        const price = response.data.solana.usd;
        return price;
    } catch (error) {
        console.error('Error fetching Solana price:', error);
        throw new Error('Unable to fetch Solana price');
    }
}
