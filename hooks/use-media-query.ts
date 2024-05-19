import { useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

/**
 * Debounce function that delays invoking the provided function until after
 * a specified delay has elapsed since the last time the debounced function was invoked.
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function _debounce(...args: Parameters<T>): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), wait);
  };
}

/**
 *
 * @param query - The media query to evaluate
 * @returns - A boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    // Function to evaluate the media query
    const evaluateMediaQuery = () => {
      if (typeof window !== "undefined") {
        const mediaQueryList = window.matchMedia(query);
        setMatches(mediaQueryList.matches);
      }
    };

    // Debounced version of our evaluateMediaQuery function
    const debouncedEvaluateMediaQuery = debounce(evaluateMediaQuery, 250);

    // Initially evaluate the media query
    evaluateMediaQuery();

    // Add resize event listener to window with debounced function
    window.addEventListener("resize", debouncedEvaluateMediaQuery);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", debouncedEvaluateMediaQuery);
    };
  }, [query]);

  return matches;
}
