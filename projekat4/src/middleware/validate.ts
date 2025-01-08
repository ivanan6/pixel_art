import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { createAPIError } from "../utils/createAPIError";

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(createAPIError("INVALID_DATA", err.errors, 400));
      }
      next(err);
    }
  };
