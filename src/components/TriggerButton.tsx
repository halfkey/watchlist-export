'use client';

import { useState } from 'react';
import { revalidatePath } from 'next/cache';

async function triggerUpdate() {
  'use server';
  console.log('Triggering update...');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cron/update`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Update failed:', errorData);
      throw new Error(errorData.error || 'Failed to trigger update');
    }

    const data = await response.json();
    console.log('Update successful:', data);
    revalidatePath('/status');
  } catch (error) {
    console.error('Error triggering update:', error);
    throw error;
  }
}

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