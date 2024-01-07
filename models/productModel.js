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
});

// const Product =
//   conn.UsersDB.mongoose.models.Product || conn.UsersDB.mongoose.model("Product", productSchema);



const createProductModel = (dbName) => {
  const PhoneDB=mongoose.createConnection(`${process.env.MONGO_URI}${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return PhoneDB.models.Product || PhoneDB.model('Product', productSchema );
};

export default createProductModel;
