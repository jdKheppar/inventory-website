const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    // This could be a predefined set of roles like "Manager," "Sales Associate," etc.
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
