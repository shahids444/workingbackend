import asyncHandler from "express-async-handler";
import Testinomal from "../models/testModel.js";
// @desc    Get all Testinomals
// @route   GET /api/Testinomals
// @access  Public
export const getTestinomals = asyncHandler(async (req, res) => {
  const Testinomals = await Testinomal.find({});
  res.json(Testinomals);
});

// @desc    Get Testinomal by ID
// @route   GET /api/Testinomals/:id
// @access  Public
export const getTestinomalById = asyncHandler(async (req, res) => {
  const Testinomal = await Testinomal.findById(req.params.id); // Changed variable name to avoid conflict
  if (Testinomal) res.json(Testinomal);
  else {
    res.status(404);
    throw new Error("Testinomal not found");
  }
});

// @desc    Update Testinomal
// @route   PUT /api/Testinomals/:id
// @access  Private
export const updateTestinomal = asyncHandler(async (req, res) => {
  try {
    const updatedTestinomal = await Testinomal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTestinomal)
      return res.status(404).json({ error: "Testinomal not found" });

    res.json(updatedTestinomal);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @desc    Create a new Testinomal
// @route   POST /api/Testinomals/createTestinomal
// @access  Private
export const createTestinomals = asyncHandler(async (req, res) => {
  const { name,message } = req.body;



  const newTestinomal = await Testinomal.create({
  name,message
  });

  if (newTestinomal) {
    res
      .status(201)
      .json({
        message: "Testinomal added successfully",
        Testinomal: newTestinomal,
      });
  } else {
    res.status(400);
    throw new Error("Invalid Testinomal data");
  }
});
