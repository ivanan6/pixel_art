import { Request, Response, NextFunction } from "express";
import { APIErrorCommon } from "@/types/error";


//da bi express prepoznao funkciju za greske mora imati ovu strukturu
export const errorHandler = (
  err: Error & Partial<APIErrorCommon & { statusCode?: number }>,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.failed && err.code) {
    res.status(err.statusCode || 400).json({
      failed: true,
      code: err.code,
      extra: err.extra || null,
    });
  } else {
    res.status(500).json({
      failed: true,
      code: "INTERNAL_ERROR",
      extra: null,
    });
  }
};
