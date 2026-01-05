// Simple store for logo download counter
const COUNTER_KEY = 'logomaker_download_count';

export const getDownloadCount = (): number => {
  const stored = localStorage.getItem(COUNTER_KEY);
  return stored ? parseInt(stored, 10) : 0;
};

export const incrementDownloadCount = (): number => {
  const current = getDownloadCount();
  const newCount = current + 1;
  localStorage.setItem(COUNTER_KEY, newCount.toString());
  return newCount;
};
