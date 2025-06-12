const CACHE_KEY = 'skipImageCache';
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

export const getCachedImage = (url: string): string | null => {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  const now = Date.now();
  if (cache[url] && now - cache[url].timestamp < CACHE_EXPIRY) {
    return cache[url].data;
  }
  return null;
};

export const setCachedImage = (url: string, data: string) => {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  cache[url] = { data, timestamp: Date.now() };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

export const clearImageCache = () => {
  localStorage.removeItem(CACHE_KEY);
};

// Clear cache on page refresh
window.addEventListener('beforeunload', clearImageCache); 