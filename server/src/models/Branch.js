import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    course: { type: String, required: true },
    timing: { type: String, required: true },
    startDate: { type: String, required: true },
    mode: { type: String, default: "Classroom" },
    seatsLeft: { type: Number, default: 10 }
  },
  { _id: false }
);

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    images: [{ type: String }],
    heroImage: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    trainers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trainer" }],
    facilities: [{ type: String }],
    batches: [batchSchema],
    mapEmbedUrl: { type: String },
    lat: { type: Number },
    lng: { type: Number },
    isFlagship: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Branch", branchSchema);
