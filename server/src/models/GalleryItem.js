import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["classrooms", "students", "trainers", "events", "workshops", "branches", "certifications"],
      required: true
    },
    type: { type: String, enum: ["image", "video"], default: "image" },
    url: { type: String, required: true },
    thumbnail: { type: String },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("GalleryItem", galleryItemSchema);
