import { NextResponse } from 'next/server';

const KRAKEN_API_URL = 'https://api.kraken.com/0/public/Ticker';

export async function GET() {
  try {
    const response = await fetch(KRAKEN_API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Kraken API error: ${data.error}`);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Kraken data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Kraken data' },
      { status: 500 }
    );
  }
} 