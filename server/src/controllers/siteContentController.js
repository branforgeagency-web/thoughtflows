import asyncHandler from "express-async-handler";
import SiteContent from "../models/SiteContent.js";

export const getContent = asyncHandler(async (req, res) => {
  const items = await SiteContent.find();
  const map = {};
  items.forEach((i) => (map[i.key] = i.value));
  res.json({ success: true, data: map });
});

export const upsertContent = asyncHandler(async (req, res) => {
  const { key, value } = req.body;
  const item = await SiteContent.findOneAndUpdate(
    { key },
    { key, value },
    { new: true, upsert: true, runValidators: true }
  );
  res.json({ success: true, data: item });
});
