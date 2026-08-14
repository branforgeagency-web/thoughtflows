import express from "express";
import { protect } from "../middleware/authMiddleware.js";

/**
 * Wires standard REST endpoints for a crudFactory controller.
 * Reads are public (needed by the public site), writes require admin auth.
 */
const crudRoutes = (controller, { slugLookup = false } = {}) => {
  const router = express.Router();

  router.get("/", controller.getAll);
  if (slugLookup) router.get("/slug/:slug", controller.getBySlug);
  router.get("/:id", controller.getOne);

  router.post("/", protect, controller.create);
  router.put("/:id", protect, controller.update);
  router.delete("/:id", protect, controller.remove);

  return router;
};

export default crudRoutes;
