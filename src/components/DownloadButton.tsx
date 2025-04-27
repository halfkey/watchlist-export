'use client';

import { useState } from 'react';

export default function DownloadButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cron/update');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch watchlist');
      }

      // Create a blob from the watchlist data
      const blob = new Blob([data.watchlist], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = `kraken-watchlist-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download watchlist:', error);
      alert('Failed to download watchlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`px-6 py-3 font-medium text-white rounded-xl transition-colors duration-200 ${
        isLoading
          ? 'bg-slate-800/50 cursor-not-allowed'
          : 'bg-slate-800 hover:bg-slate-700'
      }`}
    >
      {isLoading ? 'Downloading...' : 'Download Watchlist'}
    </button>
  );
} 