const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getAllSuppliers,
  getAllSuppliersAdmin,
  getSupplierDetails,
  updateSupplier,
  deleteSupplier,
} = require("../controller/supplierController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");

// Route to create a new supplier (Admin only)
router.route("/admin/supplier/new").post(isAuthentictedUser, authorizeRoles("admin"), createSupplier);

// Route to get all suppliers (Admin only)
router.route("/admin/suppliers").get(isAuthentictedUser, authorizeRoles("admin"), getAllSuppliersAdmin);

// Route to get all suppliers (Public)
router.route("/suppliers").get(getAllSuppliers);

// Route to get supplier details by ID (Public)
router.route("/supplier/:id").get(getSupplierDetails);

// Route to update supplier (Admin only)
router.route("/admin/supplier/:id")
  .put(isAuthentictedUser, authorizeRoles("admin"), updateSupplier)
  .delete(isAuthentictedUser, authorizeRoles("admin"), deleteSupplier); // Route to delete supplier

module.exports = router;
