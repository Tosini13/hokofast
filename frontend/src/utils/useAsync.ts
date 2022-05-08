import { useState } from "react";

export type TUseAsyncResult = {
  isProcessing: boolean;
  error?: unknown;
  execute: <TResult>(promise: Promise<TResult>) => Promise<TResult>;
};

const useAsync = (): TUseAsyncResult => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<unknown | undefined>();
  return {
    isProcessing,
    error,
    execute: async <TResult>(promise: Promise<TResult>) => {
      try {
        setIsProcessing(true);
        const response = await promise;
        setIsProcessing(false);
        return response;
      } catch (e) {
        console.error("e", e);
        setError(e);
        setIsProcessing(false);
        return new Promise(() => ({
          error: {
            message: "UNDEFINED_ERROR",
          },
        }));
      }
    },
  };
};

export default useAsync;
