import { formatTradingViewWatchlist } from '../formatTradingView';

describe('formatTradingViewWatchlist', () => {
  const mockTickerData = {
    'BTC/USD': {
      a: ['50000', '1', '1.000'],
      b: ['49900', '1', '1.000'],
      c: ['50000', '1'],
      v: ['100', '1000'],
      p: ['49900', '49800'],
      l: ['49000', '48000'],
      h: ['51000', '52000'],
      o: '49500'
    },
    'ETH/USD': {
      a: ['3000', '1', '1.000'],
      b: ['2990', '1', '1.000'],
      c: ['3000', '1'],
      v: ['200', '2000'],
      p: ['2990', '2980'],
      l: ['2900', '2800'],
      h: ['3100', '3200'],
      o: '2950'
    }
  };

  it('should format ticker data correctly', () => {
    const result = formatTradingViewWatchlist(mockTickerData);
    expect(result).toBe('KRAKEN:BTCUSD,KRAKEN:ETHUSD');
  });

  it('should filter by volume', () => {
    const result = formatTradingViewWatchlist(mockTickerData, { minVolumeUSD: 150000 });
    expect(result).toBe('KRAKEN:BTCUSD');
  });

  it('should limit number of pairs', () => {
    const result = formatTradingViewWatchlist(mockTickerData, { maxPairs: 1 });
    expect(result).toBe('KRAKEN:BTCUSD');
  });

  it('should handle empty data', () => {
    const result = formatTradingViewWatchlist({});
    expect(result).toBe('');
  });
}); 