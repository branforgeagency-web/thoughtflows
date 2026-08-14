import branchController from "../controllers/branchController.js";
import crudRoutes from "../utils/crudRoutes.js";

export default crudRoutes(branchController, { slugLookup: true });
