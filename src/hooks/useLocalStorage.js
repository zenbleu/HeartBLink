import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to persist and synchronize state with localStorage.
 * Automatically synchronizes across components and window storage events.
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - fallback initial state
 * @returns {[any, Function]} - [storedValue, setValue]
 */
export function useLocalStorage(key, initialValue) {
  // Read value from localStorage or fallback
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null || item === undefined) {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        console.warn(`Tried setting localStorage key "${key}" even though window is undefined.`);
        return;
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);

        // Dispatch a custom event so other hook instances in the same tab update
        window.dispatchEvent(
          new CustomEvent('local-storage-sync', {
            detail: { key, value: newValue }
          })
        );
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    setStoredValue(readValue());

    const handleStorageChange = (e) => {
      if (e.key === key) {
        setStoredValue(readValue());
      }
    };

    const handleCustomSync = (e) => {
      if (e.detail?.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-sync', handleCustomSync);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-sync', handleCustomSync);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
