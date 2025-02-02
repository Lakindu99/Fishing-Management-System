const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter employee name"],
    trim: true,
  },
  contactInfo: {
    type: String,
    required: [true, "Please enter employee contact information"],
  },
  role: {
    type: String,
    required: [true, "Please enter employee position"],
  },
  salary: {
    type: Number,
    required: [true, "Please enter employee salary"],
  },
  user: {
    type: mongoose.Schema.ObjectId, 
    ref: "userModel", // The admin who adds the employee
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EmployeeModel = mongoose.model("EmployeeModel", employeeSchema);
module.exports = EmployeeModel;
