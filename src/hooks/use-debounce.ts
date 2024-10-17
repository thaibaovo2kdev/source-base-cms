import { useState, useEffect } from 'react';

/**
 * Hook useDebounce returns the value after a certain delay time.
 * @param value - The value to debounce.
 * @param delay - The delay time in milliseconds.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timeout to update the debounced value after the delay ends
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timeout if the value or delay changes before the timeout ends
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only trigger when `value` or `delay` changes

  return debouncedValue;
}

export default useDebounce;
