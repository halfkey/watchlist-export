'use client';

import { useState } from 'react';
import { triggerUpdate } from '@/app/actions';

export default function TriggerButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      action={async () => {
        setIsLoading(true);
        try {
          await triggerUpdate();
        } catch (error) {
          console.error('Failed to trigger update:', error);
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
  );
} 