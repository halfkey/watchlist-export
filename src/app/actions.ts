'use server';

import { revalidatePath } from 'next/cache';

export async function triggerUpdate() {
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