import asyncHandler from "express-async-handler";
import Enquiry from "../models/Enquiry.js";

export const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find()
    .populate("branch", "name city")
    .populate("course", "name")
    .sort({ createdAt: -1 });
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("Name, phone, and email are required");
  }
  const enquiry = await Enquiry.create(req.body);
  res.status(201).json({ success: true, data: enquiry });
});

export const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!enquiry) {
    res.status(404);
    throw new Error("Not found");
  }
  res.json({ success: true, data: enquiry });
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) {
    res.status(404);
    throw new Error("Not found");
  }
  res.json({ success: true, data: {} });
});
