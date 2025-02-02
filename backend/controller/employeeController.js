const EmployeeModel = require("../model/EmployeeModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");

// >>>>>>>>>>>>>>>>>>>>> createEmployee Admin route  >>>>>>>>>>>>>>>>>>>>>>>>
exports.createEmployee = asyncWrapper(async (req, res) => {
  req.body.user = req.user.id; // Set the user who created the employee
  const employee = await EmployeeModel.create(req.body); // Create a new employee
  res.status(201).json({ success: true, employee });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get all employees >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getAllEmployees = asyncWrapper(async (req, res) => {
  const employees = await EmployeeModel.find(); // Retrieve all employees
  res.status(200).json({
    success: true,
    employees,
  });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get employee details >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getEmployeeDetails = asyncWrapper(async (req, res, next) => {
  const employee = await EmployeeModel.findById(req.params.id); // Find employee by ID
  if (!employee) {
    return next(new ErrorHandler("Employee not found", 404));
  }
  res.status(200).json({
    success: true,
    employee,
  });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> update employee >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.updateEmployee = asyncWrapper(async (req, res, next) => {
  let employee = await EmployeeModel.findById(req.params.id); // Find employee by ID

  if (!employee) {
    return next(new ErrorHandler("Employee not found", 404));
  }

  employee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }); // Update employee

  res.status(200).json({
    success: true,
    employee,
  });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> delete employee >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.deleteEmployee = asyncWrapper(async (req, res, next) => {
  const employee = await EmployeeModel.findById(req.params.id); // Find employee by ID

  if (!employee) {
    return next(new ErrorHandler("Employee not found", 404));
  }

  await employee.remove(); // Delete employee
  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
});
