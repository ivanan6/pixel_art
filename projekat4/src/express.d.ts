import "express";

// declare module "express" {
//   export interface Request {
//     user?: { userId: string; username: string };
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string; username: string;
      };
    }
  }
}