import express from "express";
import {
  getTestinomals,
  getTestinomalById,
  createTestinomals,
  updateTestinomal,
} from "../controllers/testinomalController.js";
import { protect } from "../middleware/authMiddleware.js";
import Testinomal from "../models/testModel.js";
const router = express.Router();

// Update a Testinomal by ID

// DELETE a Testinomal by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTestinomal = await Testinomal.findByIdAndDelete(req.params.id);
    if (!deletedTestinomal) {
      return res.status(404).json({ message: "Testinomal not found" });
    }
    res.json({ message: "Testinomal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// UPDATE a Testinomal by ID
router.put("/:id", updateTestinomal);

router.route("/").get(getTestinomals);
// router.route("/upload").get(upload);
// router.route("/createTestinomal").post(protect,createTestinomals)
router.route("/createTestinomal").post(createTestinomals);
export default router;
