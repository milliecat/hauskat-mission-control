/**
 * Storage utility with enhanced error handling and data validation
 */

const STORAGE_VERSION = '1.0.0';
const VERSION_KEY = 'hauskat_storage_version';

/**
 * Safely parse JSON with error handling
 */
function safeParse(value, defaultValue) {
  try {
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('[Storage] Failed to parse JSON:', error);
    return defaultValue;
  }
}

/**
 * Check if localStorage is available and working
 */
function isStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.error('[Storage] localStorage is not available:', error);
    return false;
  }
}

/**
 * Load state from localStorage with error handling
 */
export function loadState(key, defaultValue) {
  if (!isStorageAvailable()) {
    return defaultValue;
  }

  try {
    const saved = localStorage.getItem(key);
    return safeParse(saved, defaultValue);
  } catch (error) {
    console.error(`[Storage] Error loading state for key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Save state to localStorage with quota error handling
 */
export function saveState(key, value) {
  if (!isStorageAvailable()) {
    return false;
  }

  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('[Storage] Storage quota exceeded. Clearing old data...');
      // Attempt to clear non-essential data
      clearOldData();
      // Try one more time
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (retryError) {
        console.error('[Storage] Still failed after clearing:', retryError);
        return false;
      }
    }
    console.error(`[Storage] Error saving state for key "${key}":`, error);
    return false;
  }
}

/**
 * Clear old or non-essential data
 */
function clearOldData() {
  const essentialKeys = ['activeSection', 'sidebarOpen', 'completedItems', 'activePhase'];

  try {
    const allKeys = Object.keys(localStorage);
    allKeys.forEach((key) => {
      if (!essentialKeys.includes(key) && key !== VERSION_KEY) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('[Storage] Error clearing old data:', error);
  }
}

/**
 * Remove item from storage
 */
export function removeState(key) {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Error removing key "${key}":`, error);
  }
}

/**
 * Clear all application storage
 */
export function clearStorage() {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.error('[Storage] Error clearing storage:', error);
  }
}

/**
 * Initialize storage version
 */
export function initializeStorage() {
  const currentVersion = loadState(VERSION_KEY, null);

  if (!currentVersion) {
    // First time or migration needed
    saveState(VERSION_KEY, STORAGE_VERSION);
  } else if (currentVersion !== STORAGE_VERSION) {
    // Handle migration if needed
    console.log(`[Storage] Migrating from ${currentVersion} to ${STORAGE_VERSION}`);
    saveState(VERSION_KEY, STORAGE_VERSION);
  }
}
