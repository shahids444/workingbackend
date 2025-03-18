import express from "express";
import { getProducts, getProductById ,createProducts,updateProduct, getProductsByName} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import Product from "../models/productModel.js";
const router = express.Router();

// Update a product by ID

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
// UPDATE a product by ID
router.put("/:id", updateProduct);
  
router.route("/").get(getProducts);
router.get("/search", getProductsByName);
router.route("/:id").get(getProductById);

// router.route("/upload").get(upload);
// router.route("/createProduct").post(protect,createProducts)
router.route("/createProduct").post(createProducts)
export default router;
