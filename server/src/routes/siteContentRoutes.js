import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getContent, upsertContent } from "../controllers/siteContentController.js";

const router = express.Router();

router.get("/", getContent);
router.post("/", protect, upsertContent);

export default router;
