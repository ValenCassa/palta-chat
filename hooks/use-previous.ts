import { useRef } from "react";

/**
 * @param value - The value to store
 * @returns - The previous value
 */
export function usePrevious(value: any) {
  const currentRef = useRef(value);
  const previousRef = useRef();
  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }
  return previousRef.current;
}
