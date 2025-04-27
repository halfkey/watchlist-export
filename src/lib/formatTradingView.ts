interface TickerData {
  [key: string]: {
    a: string[];
    b: string[];
    c: string[];
    v: string[];
    p: string[];
    l: string[];
    h: string[];
    o: string;
  };
}

interface VolumeFilter {
  minVolumeUSD?: number;
  maxPairs?: number;
}

// List of valid quote currencies for TradingView
const VALID_QUOTE_CURRENCIES = ['USD', 'EUR', 'BTC', 'ETH'];

// Function to validate and format a trading pair
function validateAndFormatPair(pair: string): string | null {
  // Split the pair into base and quote currencies
  const [base, quote] = pair.split('/');
  
  // Check if the quote currency is valid
  if (!VALID_QUOTE_CURRENCIES.includes(quote)) {
    return null;
  }

  // Convert XBT to BTC for Bitcoin
  const formattedBase = base.replace('XBT', 'BTC');
  
  return `KRAKEN:${formattedBase}${quote}`;
}

export function formatTradingViewWatchlist(
  data: TickerData,
  filter: VolumeFilter = { minVolumeUSD: 10000, maxPairs: 1000 }
): string {
  // Convert Kraken pairs to TradingView format and filter by volume
  const pairs = Object.entries(data)
    .map(([pair, ticker]) => {
      // Calculate 24h volume in USD
      const volume = parseFloat(ticker.v[1]); // 24h volume
      const lastPrice = parseFloat(ticker.c[0]); // Last price
      const volumeUSD = volume * lastPrice;

      return {
        pair,
        volumeUSD,
        formattedPair: pair.replace('XBT', 'BTC')
      };
    })
    .filter(item => item.volumeUSD >= (filter.minVolumeUSD || 0))
    .sort((a, b) => b.volumeUSD - a.volumeUSD) // Sort by volume descending
    .slice(0, filter.maxPairs || 1000) // Limit number of pairs
    .map(item => `KRAKEN:${item.formattedPair}`);

  // Join pairs with commas as per TradingView format
  return pairs.join(',');
}

export function downloadWatchlist(data: string, filename: string = 'kraken-watchlist.txt') {
  const blob = new Blob([data], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
} 