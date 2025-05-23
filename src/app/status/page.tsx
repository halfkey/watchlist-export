import { getLastUpdate } from '@/lib/storage';
import TriggerButton from '@/components/TriggerButton';
import { Suspense } from 'react';

async function StatusDisplay() {
  const lastUpdate = await getLastUpdate();
  
  return (
    <div className="space-y-4">
      {lastUpdate ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Last Update:</span>
            <span className="text-slate-100">
              {new Date(lastUpdate.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Status:</span>
            <span className={`${lastUpdate.success ? 'text-green-400' : 'text-red-400'}`}>
              {lastUpdate.success ? 'Success' : 'Failed'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Pairs Processed:</span>
            <span className="text-slate-100">{lastUpdate.pairCount}</span>
          </div>
          {lastUpdate.error && (
            <div className="mt-4 p-4 bg-red-950/50 border border-red-900/50 rounded-lg">
              <p className="text-red-400">Error: {lastUpdate.error}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-slate-400 text-center">No updates recorded yet</p>
      )}
    </div>
  );
}

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6 text-slate-100">
            Watchlist Update Status
          </h1>
        </header>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
            <Suspense fallback={
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400"></div>
              </div>
            }>
              <StatusDisplay />
            </Suspense>

            <div className="mt-8 flex justify-center">
              <TriggerButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 