import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of the employee"],
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
  position: {
    type: String,
  },

  hireDate: {
    type: Date,
  },
  salary: {
    type: Number,
  },

  workingHours: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "On Leave", "Terminated"], // Enum to represent employee status
    default: "Active", // Default status
  },
});

// const Employee =
//   mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

// export default Employee;

const createEmployeeModel = (dbName) => {
  const PhoneDB=mongoose.createConnection(`${process.env.MONGO_URI}${dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return PhoneDB.models.Employee || PhoneDB.model('Employee', employeeSchema );
};

export default createEmployeeModel;