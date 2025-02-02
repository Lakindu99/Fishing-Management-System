const SupplierModel = require("../model/SupplierModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");

// >>>>>>>>>>>>>>>>>>>>> createSupplier Admin route  >>>>>>>>>>>>>>>>>>>>>>>>
exports.createSupplier = asyncWrapper(async (req, res) => {
  req.body.user = req.user.id; // Set the user who created the supplier
  const supplier = await SupplierModel.create(req.body); // Create a new supplier
  res.status(201).json({ success: true, supplier });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get all suppliers >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getAllSuppliers = asyncWrapper(async (req, res) => {
  const suppliers = await SupplierModel.find(); // Retrieve all suppliers
  res.status(200).json({
    success: true,
    suppliers,
  });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get all suppliers admin route>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getAllSuppliersAdmin = asyncWrapper(async (req, res) => {
  const suppliers = await SupplierModel.find(); // Retrieve all suppliers for admin
  res.status(200).json({
    success: true,
    suppliers,
  });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get supplier details >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getSupplierDetails = asyncWrapper(async (req, res, next) => {
  const supplier = await SupplierModel.findById(req.params.id); // Find supplier by ID
  if (!supplier) {
    return next(new ErrorHandler("Supplier not found", 404));
  }
  res.status(200).json({
    success: true,
    supplier,
  });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> update supplier >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.updateSupplier = asyncWrapper(async (req, res, next) => {
  let supplier = await SupplierModel.findById(req.params.id); // Find supplier by ID

  if (!supplier) {
    return next(new ErrorHandler("Supplier not found", 404));
  }

  supplier = await SupplierModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }); // Update supplier

  res.status(200).json({
    success: true,
    supplier,
  });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> delete supplier >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.deleteSupplier = asyncWrapper(async (req, res, next) => {
  const supplier = await SupplierModel.findById(req.params.id); // Find supplier by ID

  if (!supplier) {
    return next(new ErrorHandler("Supplier not found", 404));
  }

  await supplier.remove(); // Delete supplier
  res.status(200).json({
    success: true,
    message: "Supplier deleted successfully",
  });
});
