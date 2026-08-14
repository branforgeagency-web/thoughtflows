import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    message: { type: String },
    status: { type: String, enum: ["new", "contacted", "enrolled", "closed"], default: "new" }
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
