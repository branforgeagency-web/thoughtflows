import express from "express";
import { getSitemap, getRobotsTxt } from "../controllers/sitemapController.js";

const router = express.Router();

router.get("/sitemap.xml", getSitemap);
router.get("/robots.txt", getRobotsTxt);

export default router;
