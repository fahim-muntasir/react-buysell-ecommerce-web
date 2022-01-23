const Product = require("../model/product");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const searchProdctController = async (req, res) => {
  try {
    const { searchQuery } = req.body;
    const findProducts = await Product.find({
      catagory: capitalizeFirstLetter(searchQuery),
    });
    res.status(200).json({ products: findProducts });
  } catch {
    res.status(404).json({ error: "Product not found!" });
  }
};

module.exports = searchProdctController;
