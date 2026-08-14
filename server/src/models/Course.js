import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline: { type: String, trim: true },
    duration: { type: String, required: true },
    format: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: String }],
    careerOpportunities: [{ type: String }],
    curriculum: [{ title: String, topics: [{ type: String }] }],
    whatIsIt: { type: String },
    whoIsItFor: [{ type: String }],
    roles: [{ type: String }],
    batchOptions: [{ label: String, schedule: String }],
    examOverview: {
      duration: String,
      format: String,
      passRequirement: String,
      language: String
    },
    features: [{ title: String, description: String }],
    faqs: [{ question: String, answer: String }],
    fee: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
