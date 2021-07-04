export const TYPE_OF = ['Coins and Tokens', 'Coins', 'Tokens'];
export const PERFORMANCE = {
  '1 hr': 'price_change_percentage_1h_in_currency',
  '1 day': 'price_change_percentage_24h_in_currency',
  '7 days': 'price_change_percentage_7d_in_currency',
  '1 month': 'price_change_percentage_30d_in_currency',
};
export const BLOCK_SIZE = {
  'market cap': 'market_cap',
  volume: 'total_volume',
};

export const API_URI =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y';
