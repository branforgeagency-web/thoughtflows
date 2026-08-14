import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    photo: { type: String },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    videoUrl: { type: String },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    beforeRole: { type: String },
    afterRole: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
