const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter supplier name"],
    trim: true,
  },
  contactInfo: {
    type: String,
    required: [true, "Please enter supplier contact information"],
  },
  address: {
    type: String,
    required: [true, "Please enter supplier address"],
  },
  category: {
    type: String,
    required: [true, "Please enter supplier category"],
  },
  // When multiple admins manage suppliers, this helps identify which admin added the supplier
  user: {
    type: mongoose.Schema.ObjectId, // this is for admin who adds the supplier to the DB
    ref: "userModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SupplierModel = mongoose.model("SupplierModel", supplierSchema);
module.exports = SupplierModel;























