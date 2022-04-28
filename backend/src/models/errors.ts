type TError = {
  error: {
    message: string;
  };
};

export const setError = (message?: string): TError => ({
  error: {
    message,
  },
});
