import { NextResponse } from 'next/server';

const KRAKEN_API_URL = 'https://api.kraken.com/0/public/Ticker';

export async function GET() {
  try {
    console.log('Fetching data from Kraken API...');
    const response = await fetch(KRAKEN_API_URL);
    const data = await response.json();

    if (!response.ok) {
      console.error('Kraken API error:', data.error);
      throw new Error(`Kraken API error: ${data.error}`);
    }

    console.log('Successfully fetched data from Kraken API');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Kraken data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Kraken data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 