import mongoose from "mongoose";
const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a supplier name or company name"],
    unique: true,
  },
  contactPerson: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});

const Supplier =
  mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema);

export default Supplier;
