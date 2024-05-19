import { z } from "zod";
import { useSearchParams as useNextSearchParams } from "next/navigation";
import { useCallback } from "react";

export const createSearchParamsHook = <T>(schema: z.ZodType<T>) => {
  return function useSearchParams() {
    const searchParams = useNextSearchParams();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const appendToQueryString = useCallback(
      (name: keyof T, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name as string, value);

        return params.toString();
      },
      [searchParams],
    );

    const removeFromQueryString = useCallback(
      (name: keyof T) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(name as string);

        return params.toString();
      },
      [searchParams],
    );

    // To object
    const _searchParams = Object.fromEntries(searchParams.entries()) as T;

    return {
      searchParams: _searchParams,
      appendToQueryString,
      removeFromQueryString,
    };
  };
};
