'use server';

import { revalidatePath } from 'next/cache';

export async function triggerUpdate() {
  console.log('Triggering update...');
  
  try {
    // Use absolute URL for the API endpoint
    const apiUrl = new URL('/api/cron/update', process.env.NEXT_PUBLIC_APP_URL).toString();
    console.log('Calling API endpoint:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Update failed:', errorData);
      throw new Error(errorData.error || 'Failed to trigger update');
    }

    const data = await response.json();
    console.log('Update successful:', data);
    
    // Revalidate the status page
    revalidatePath('/status');
    console.log('Status page revalidated');
    
    return { success: true, data };
  } catch (error) {
    console.error('Error triggering update:', error);
    throw error;
  }
} 