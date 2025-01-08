import { APIErrorCommon,ErrorCode } from "@/types/error";

export const createAPIError = (code: ErrorCode, extra?: any, statusCode = 400): Error & APIErrorCommon & { statusCode: number } => {
  const error = new Error(code) as Error & APIErrorCommon & { statusCode: number };
  error.failed = true;
  error.code = code;
  error.extra = extra;
  error.statusCode = statusCode; // HTTP status kod
  return error;
};
