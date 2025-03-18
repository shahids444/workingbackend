import express from "express";
import { getContacts, getContactById ,createContacts,updateContact} from "../controllers/ContactController.js";
import { protect } from "../middleware/authMiddleware.js";
import Contact from "../models/ContactModel.js";
const router = express.Router();

// Update a Contact by ID

// DELETE a Contact by ID
router.delete("/:id", async (req, res) => {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);
      if (!deletedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json({ message: "Contact deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
// UPDATE a Contact by ID
router.put("/:id", updateContact);
  
router.route("/").get(getContacts);
router.route("/:id").get(getContactById);
// router.route("/upload").get(upload);
// router.route("/createContact").post(protect,createContacts)
router.route("/createContact").post(createContacts)
export default router;
