import { NextResponse } from 'next/server';
import { formatTradingViewWatchlist } from '@/lib/formatTradingView';
import { recordUpdate } from '@/lib/storage';

const KRAKEN_API_URL = 'https://api.kraken.com/0/public/Ticker';

export async function GET() {
  console.log('Cron job started at:', new Date().toISOString());
  
  try {
    const response = await fetch(KRAKEN_API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Kraken API error: ${data.error}`);
    }

    // Format the data for TradingView
    const watchlist = formatTradingViewWatchlist(data.result);
    const pairCount = Object.keys(data.result).length;
    
    console.log('Watchlist generated successfully:', {
      pairCount,
      timestamp: new Date().toISOString()
    });

    // Record the successful update
    recordUpdate({
      timestamp: new Date().toISOString(),
      pairCount,
      success: true
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      watchlist,
      pairCount
    });
  } catch (error) {
    console.error('Error in cron job:', error);
    
    // Record the failed update
    recordUpdate({
      timestamp: new Date().toISOString(),
      pairCount: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      { error: 'Failed to update watchlist', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 