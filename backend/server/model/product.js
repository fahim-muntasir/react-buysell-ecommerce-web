const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Types.ObjectId,
  },
  productName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  catagory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    default: Date.now(),
  },
});

// create schema model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
