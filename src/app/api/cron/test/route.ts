import { NextResponse } from 'next/server';
import { formatTradingViewWatchlist } from '@/lib/formatTradingView';

const KRAKEN_API_URL = 'https://api.kraken.com/0/public/Ticker';

export async function GET() {
  console.log('Test cron job triggered at:', new Date().toISOString());
  
  try {
    const response = await fetch(KRAKEN_API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Kraken API error: ${data.error}`);
    }

    // Format the data for TradingView
    const watchlist = formatTradingViewWatchlist(data.result);
    console.log('Test watchlist generated successfully:', {
      pairCount: Object.keys(data.result).length,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      watchlist,
      pairCount: Object.keys(data.result).length
    });
  } catch (error) {
    console.error('Error in test cron job:', error);
    return NextResponse.json(
      { error: 'Failed to update watchlist', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 