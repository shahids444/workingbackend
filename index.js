import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import morgan from "morgan";
import multer from "multer";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import testinomalRoutes from "./src/routes/testinomalRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import blogRoutes from "./src/routes/blogRoutes.js";
import cookieParser from "cookie-parser";
import { protect } from "./src/middleware/authMiddleware.js";
import { fileURLToPath } from 'url';
dotenv.config();
import User from "./src/models/userModel.js";
import Product from "./src/models/productModel.js";

connectDB();

const app = express();
app.use(cookieParser()); // Enable reading cookies
app.use(express.json());
app.use(cors({
    origin: "https://finalfrontend-psi.vercel.app", 
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(morgan("dev"));
// app.use((req,res,next)=>{
   
//     let token = req.headers.authorization;
//     let token2 = token.split(" ")[1];
//     jwt.verify(token2,process.env.JWT_SECRET,(err,decoded)=>{
//         console.log(decoded)
//     })
//     next()
// })
app.use("/api/users",userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/testinomals", testinomalRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contacts", contactRoutes);
// Get the current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'upload' directory
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.get("/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true, // Secure against XSS
        secure: true, // Set to true in production (HTTPS)
        sameSite: "None",
        maxAge: 24000 * 60 * 60, // 1 hour
  });
  res.status(200).json({ message: "Logged out successfully" });
});
app.get("/user-check", (req,res)=>{
  let token = req.cookies.auth_token;
  jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
    console.log(decode.id)
    console.log(decode)
    User.findById(decode.id)
    .then(obj =>     res.json({name: obj?.name,id: decode.id}))
    .catch(err => console.error("Error:", err));
  
    

  })
  
  console.log("cookie",req.cookies)

})


app.get("/auth-check", (req, res) => {
    console.log("🔍 Cookies received in auth-check:", req.cookies); // Debug log
    console.log(req.cookies)
    const token = req.cookies.auth_token; 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ message: "Authenticated", user: decoded });
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
});

// GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/clear-category", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging log

    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ error: "Category is required in request body" });
    }

    // Remove category from matching products
    const result = await Product.updateMany(
      { category },
      { $unset: { category: 1 }, $set: { status: true } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No products found with this category" });
    }

    res.json({ message: `Removed category from ${result.modifiedCount} products` });
  } catch (error) {
    console.error("Error in clear-category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
