import { Router } from "express";
import { login, register } from "../controllers/authController";
import { z } from "zod";
import { validate } from "../middleware/validate";

const router = Router();

const loginSchema = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(8).max(32),
});

const registerSchema = z.object({
  username: z.string().min(2).max(32),
  password: z.string().min(8).max(128),
});

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

export default router;
