const Product = require("../model/product");

const productController = async (req, res) => {
  if (req.files && req.files.length > 0) {
    if (req.body) {
      try {
        const product = await new Product({
          authorId: req.user.id,
          productName: req.body.productName,
          address: req.body.address,
          catagory: req.body.catagory,
          price: req.body.productPrice,
          productImage: req.files[0].filename,
        });
        const result = await product.save();
        res.status(200).json({ msg: "Add product successfull." });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: {
            msg: "Product add faild!",
          },
        });
      }
    } else {
      res.status(500).json({
        error: {
          msg: "Every fild is require!",
        },
      });
    }
  } else {
    res.status(500).json({
      error: {
        msg: "Please upload a Product image!",
      },
    });
  }
};

module.exports = productController;
