import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import multer from "multer";
const router = express.Router();
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null,`${req.body.name}.${file.originalname.split(".")[1]}`);
    }
});

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login",loginUser);

// GET user details by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE user details
router.put("/:id", async (req, res) => {
    try {
      const { name, email, password, image, isAdmin } = req.body;
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); // Use a meaningful variable name
  
      console.log("New hashed password:", hashedPassword);
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, password: hashedPassword, image, isAdmin }, // ✅ Corrected here
        { new: true }
      );
  
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
  
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: error.message });
    }
  });
  
export default router;
