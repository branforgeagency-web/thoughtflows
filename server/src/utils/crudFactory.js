import asyncHandler from "express-async-handler";

/**
 * Generic CRUD controller factory used by every admin-manageable resource
 * (Course, Branch, Trainer, Testimonial, GalleryItem, PlacementStat).
 * Keeps controllers DRY instead of hand-rolling six near-identical files.
 */
const crudFactory = (Model, { populate } = {}) => ({
  getAll: asyncHandler(async (req, res) => {
    let query = Model.find().sort({ order: 1, createdAt: -1 });
    if (populate) query = query.populate(populate);
    const items = await query;
    res.json({ success: true, count: items.length, data: items });
  }),

  getOne: asyncHandler(async (req, res) => {
    let query = Model.findById(req.params.id);
    if (populate) query = query.populate(populate);
    const item = await query;
    if (!item) {
      res.status(404);
      throw new Error("Not found");
    }
    res.json({ success: true, data: item });
  }),

  getBySlug: asyncHandler(async (req, res) => {
    let query = Model.findOne({ slug: req.params.slug });
    if (populate) query = query.populate(populate);
    const item = await query;
    if (!item) {
      res.status(404);
      throw new Error("Not found");
    }
    res.json({ success: true, data: item });
  }),

  create: asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json({ success: true, data: item });
  }),

  update: asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) {
      res.status(404);
      throw new Error("Not found");
    }
    res.json({ success: true, data: item });
  }),

  remove: asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error("Not found");
    }
    res.json({ success: true, data: {} });
  })
});

export default crudFactory;
