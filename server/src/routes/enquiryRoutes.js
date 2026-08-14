import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry
} from "../controllers/enquiryController.js";

const router = express.Router();

router.get("/", protect, getEnquiries);
router.post("/", createEnquiry);
router.put("/:id", protect, updateEnquiry);
router.delete("/:id", protect, deleteEnquiry);

export default router;
