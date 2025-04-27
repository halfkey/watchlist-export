'use client';

import { useState } from 'react';
import { triggerUpdate } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function TriggerButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="space-y-4">
      <form
        action={async () => {
          setIsLoading(true);
          setError(null);
          try {
            const result = await triggerUpdate();
            console.log('Update result:', result);
            // Refresh the page to show the updated status
            router.refresh();
          } catch (error) {
            console.error('Failed to trigger update:', error);
            setError(error instanceof Error ? error.message : 'Failed to trigger update');
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-3 font-medium text-white rounded-xl transition-colors duration-200 ${
            isLoading
              ? 'bg-slate-800/50 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-700'
          }`}
        >
          {isLoading ? 'Updating...' : 'Trigger Update Now'}
        </button>
      </form>
      {error && (
        <div className="p-4 bg-red-950/50 border border-red-900/50 rounded-lg">
          <p className="text-red-400">Error: {error}</p>
        </div>
      )}
    </div>
  );
} 