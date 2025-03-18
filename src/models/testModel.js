import mongoose from "mongoose";

const TestinomalSchema = new mongoose.Schema(
  {
    name: { type: String },
    message: { type: String, },
  },
);


const Testinomal = mongoose.model("Testinomal", TestinomalSchema);
export default Testinomal;
