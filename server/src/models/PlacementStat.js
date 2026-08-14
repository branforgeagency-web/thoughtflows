import mongoose from "mongoose";

const placementStatSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String, default: "TrendingUp" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("PlacementStat", placementStatSchema);
