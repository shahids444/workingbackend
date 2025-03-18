import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: Number ,required: false},
    subject: {
        type: String,
        required: false
      },
    message: { type: String, required: false }, // Reference to User model
    user: { type: String, required: false } // Reference to User model
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
