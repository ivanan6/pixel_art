import { Router } from "express";

//import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import authenticate from "../middleware/authenticate";
import { z } from "zod";

const router = Router();

const pictureSchema = z.object({
  name: z.string().min(1).max(40),
  picture_data: z
    .array(z.array(z.string().regex(/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/)).max(24))
    .max(24),
});

import {
    getPictures,
    getPictureById,
    createPicture,
    updatePicture,
    deletePicture,
  } from "../controllers/pictureController";
router.get("/", getPictures);
router.get("/:pictureId", getPictureById);
router.post("/", authenticate, validate(pictureSchema), createPicture);
router.patch("/:pictureId", authenticate, validate(pictureSchema), updatePicture);
router.delete("/:pictureId", authenticate, deletePicture);

export default router;
