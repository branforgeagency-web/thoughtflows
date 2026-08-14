import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import courseRoutes from "./routes/courseRoutes.js";
import branchRoutes from "./routes/branchRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import placementStatRoutes from "./routes/placementStatRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import siteContentRoutes from "./routes/siteContentRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ success: true, message: "Thoughtflows API is running" }));

app.use("/api/courses", courseRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/placement-stats", placementStatRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/content", siteContentRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
