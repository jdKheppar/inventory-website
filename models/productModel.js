import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a product description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  unitOfMeasure: {
    type: String,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  sku: {
    type: String,
    required: [true, "Please provide a product SKU"],
    unique: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  // You can add more attributes as needed, such as product category, images, etc.
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
