import express from "express";
import { getBlogs, getBlogById ,createBlogs,updateBlog} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
import Blog from "../models/BlogModel.js";
const router = express.Router();

// Update a Blog by ID

// DELETE a Blog by ID
router.delete("/:id", async (req, res) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
// UPDATE a Blog by ID
router.put("/:id", updateBlog);
  
router.route("/").get(getBlogs);
router.route("/:id").get(getBlogById);
// router.route("/upload").get(upload);
// router.route("/createBlog").post(protect,createBlogs)
router.route("/createBlog").post(createBlogs)
export default router;
