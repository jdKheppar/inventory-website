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

const createSupplierModel = (dbName) => {
  console.log("dbName is: ", dbName);
  const PhoneDB = mongoose.createConnection(
    `${process.env.MONGO_URI}${dbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  return PhoneDB.models.Supplier || PhoneDB.model("Supplier", supplierSchema);
};

export default createSupplierModel;
