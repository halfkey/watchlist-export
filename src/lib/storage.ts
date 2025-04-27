import { kv } from '@vercel/kv';

interface UpdateRecord {
  timestamp: string;
  pairCount: number;
  success: boolean;
  error?: string;
}

const UPDATE_KEY = 'last_update';

export async function recordUpdate(update: UpdateRecord) {
  try {
    await kv.set(UPDATE_KEY, update);
    console.log('Update recorded:', update);
  } catch (error) {
    console.error('Failed to record update:', error);
  }
}

export async function getLastUpdate(): Promise<UpdateRecord | null> {
  try {
    const update = await kv.get<UpdateRecord>(UPDATE_KEY);
    return update;
  } catch (error) {
    console.error('Failed to get last update:', error);
    return null;
  }
}

export async function clearUpdate() {
  try {
    await kv.del(UPDATE_KEY);
  } catch (error) {
    console.error('Failed to clear update:', error);
  }
} 