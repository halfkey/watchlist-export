'use client';

import { useEffect, useState } from 'react';
import { formatTradingViewWatchlist, downloadWatchlist } from '@/lib/formatTradingView';

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
  minVolumeUSD: number;
  maxPairs: number;
}

export default function KrakenTicker() {
  const [tickerData, setTickerData] = useState<TickerData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [volumeFilter, setVolumeFilter] = useState<VolumeFilter>({
    minVolumeUSD: 10000,
    maxPairs: 1000
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/kraken');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch data');
        }

        setTickerData(data.result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    if (tickerData) {
      const watchlist = formatTradingViewWatchlist(tickerData, volumeFilter);
      const date = new Date().toISOString().split('T')[0];
      downloadWatchlist(watchlist, `kraken-watchlist-${date}.txt`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-950/50 border border-red-900/50 rounded-xl p-6 text-red-400">
        Error: {error}
      </div>
    );
  }

  if (!tickerData) {
    return (
      <div className="bg-slate-900/50 rounded-xl p-6 text-slate-400">
        No data available
      </div>
    );
  }

  const date = new Date().toISOString().split('T')[0];
  const pairs = Object.keys(tickerData).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-100">
              Kraken Watchlist
            </h2>
            <p className="text-slate-400">
              {pairs} pairs available for {date}
            </p>
          </div>
          <button
            onClick={handleExport}
            className="px-8 py-4 font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors duration-200"
          >
            Download Watchlist
          </button>
        </div>
      </div>
    </div>
  );
} 