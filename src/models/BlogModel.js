import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    date: {
        type: Date,
        default: Date.now, // Automatically set to current date
      },
    user: { type: String, required: false } // Reference to User model
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
