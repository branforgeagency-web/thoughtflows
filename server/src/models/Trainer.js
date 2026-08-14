import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    expertise: [{ type: String }],
    experienceYears: { type: Number, default: 0 },
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }],
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Trainer", trainerSchema);
