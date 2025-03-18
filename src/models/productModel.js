import mongoose from "mongoose";
// listing name,
// category
// location
// address
// description
// phone number
// email
// social media: insta ,fb, whatsapp
// website
// image
// featured - badge
// status - show listing or not
// verified -badge
const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      uniqure: true
    },
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    website: { type: String },
    image: { type: String },
    user: { type: String, required: false },

    
    email: {type: String,required: true},
    instagram: {type: String, required:true},
    facebook: {type: String, required:true},
    whatsapp: {type: String, required:true},
    featured: { type: Boolean, required: true, default: false },
    status: { type: Boolean, required: true, default: false },
    verified: { type: Boolean, required: true, default: false }
    


  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
