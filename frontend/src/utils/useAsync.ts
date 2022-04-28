import { useState } from "react";

export type TUseAsyncResult = {
  isProcessing: boolean;
  execute: <TResult>(promise: Promise<TResult>) => Promise<TResult>;
};

const useAsync = (): TUseAsyncResult => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  return {
    isProcessing,
    execute: async <TResult>(promise: Promise<TResult>) => {
      try {
        setIsProcessing(true);
        const response = await promise;
        setIsProcessing(false);
        return response;
      } catch (e) {
        console.error("e", e);
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
