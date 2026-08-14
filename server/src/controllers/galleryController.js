import crudFactory from "../utils/crudFactory.js";
import GalleryItem from "../models/GalleryItem.js";

export default crudFactory(GalleryItem, { populate: "branch" });
