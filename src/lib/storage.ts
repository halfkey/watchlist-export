interface UpdateRecord {
  timestamp: string;
  pairCount: number;
  success: boolean;
  error?: string;
}

let lastUpdate: UpdateRecord | null = null;

export function recordUpdate(update: UpdateRecord) {
  lastUpdate = update;
  console.log('Update recorded:', update);
}

export function getLastUpdate(): UpdateRecord | null {
  return lastUpdate;
}

export function clearUpdate() {
  lastUpdate = null;
} 