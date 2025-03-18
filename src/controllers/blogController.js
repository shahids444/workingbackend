import Blog from "../models/BlogModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get all Blogs
// @route   GET /api/Blogs
// @access  Public
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// @desc    Get Blog by ID
// @route   GET /api/Blogs/:id
// @access  Public
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id); // Changed variable name to avoid conflict
  if (blog) res.json(blog);
  else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc    Update Blog
// @route   PUT /api/Blogs/:id
// @access  Private
export const updateBlog = asyncHandler(async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @desc    Create a new Blog
// @route   POST /api/Blogs/createBlog
// @access  Private
export const createBlogs = asyncHandler(async (req, res) => {
  const { title, description, image } = req.body;

  const blogExists = await Blog.findOne({ title }); // Changed variable name
  if (blogExists) {
    res.status(400);
    throw new Error("Blog already exists");
  }

  const newBlog = await Blog.create({
    title,
    description,
    image,
    user: req.user ? req.user._id : null, // Ensure req.user exists
  });

  if (newBlog) {
    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } else {
    res.status(400);
    throw new Error("Invalid blog data");
  }
});
