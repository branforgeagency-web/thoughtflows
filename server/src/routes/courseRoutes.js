import courseController from "../controllers/courseController.js";
import crudRoutes from "../utils/crudRoutes.js";

export default crudRoutes(courseController, { slugLookup: true });
