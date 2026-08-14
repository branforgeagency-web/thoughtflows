import crudFactory from "../utils/crudFactory.js";
import Trainer from "../models/Trainer.js";

export default crudFactory(Trainer, { populate: "branches" });
