const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getEmployeeDetails,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");

// Route to create a new employee (Admin only)
router.route("/admin/employee/new").post(isAuthentictedUser, authorizeRoles("admin"), createEmployee);

// Route to get all employees (Admin only)
router.route("/admin/employees").get(isAuthentictedUser, authorizeRoles("admin"), getAllEmployees);

// Route to get employee details by ID (Public)
router.route("/employee/:id").get(getEmployeeDetails);

// Route to update employee (Admin only)
router.route("/admin/employee/:id")
  .put(isAuthentictedUser, authorizeRoles("admin"), updateEmployee)
  .delete(isAuthentictedUser, authorizeRoles("admin"), deleteEmployee); // Route to delete employee

module.exports = router;
