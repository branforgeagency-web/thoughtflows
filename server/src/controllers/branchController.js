import crudFactory from "../utils/crudFactory.js";
import Branch from "../models/Branch.js";

export default crudFactory(Branch, { populate: ["courses", "trainers"] });
