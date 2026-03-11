// Centralized helpers for parameter parsing and safe error responses.
export const parseNumericId = (rawId: string): number | null => {
  const parsedId = Number.parseInt(rawId, 10);

  if (Number.isNaN(parsedId) || parsedId < 1) {
    return null;
  }

  return parsedId;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected server error";
};
