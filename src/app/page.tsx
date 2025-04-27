import KrakenTicker from '@/components/KrakenTicker';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6 text-slate-100">
            Crypto Watchlist Export
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Export your favorite crypto pairs from Kraken to TradingView with a single click
          </p>
        </header>
        <KrakenTicker />
      </div>
    </main>
  );
}
