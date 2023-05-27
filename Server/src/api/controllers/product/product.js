// import Product from "../../models/product.js";
// import Product from "../../models/product.js";
 Product = require( "../../../api/models/product.js");
const productController={

    // add item to the data base
    createProduct: async (req, res) => {
        try {
          const { name, price, color, size, productImage,description} = req.body;
            if (!name || !price)
            return res.status(400).json({ msg: "Please fill in all fields." });

            const newProduct = new Product({
              name, price, color, size, productImage,description
            });
            console.log(newProduct)
            await newProduct.save();
            res.json({
                message:"Product Added success",
                data:newProduct,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
  // get all products from the database
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json({ message: "Products fetch success", data: products });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // getOneProduct: async (req, res) => {
  //   const id = req.params.id;
  //   try {
  //     const product = await Product.findOne({ _id: id });
  //     res.json({ message: "Product fetch success", data: product });
  //   } catch (err) {
  //     return res.status(500).json({ message: err.message });
  //   }
  // },

  //   getCategoryProduct: async (req, res) => {
  //     const { product } = req.body;
  //       try {

  //           const categoryProduct = await Product.find({product:product});
  //           res.json({ message: " Sub Category file fetch success", data: categoryProduct});
  //       } catch (err) {
  //           return res.status(500).json({ message: err.message });
  //       }
  //   },
    // get one item in the data base
    getOneProduct: async (req, res) => {
        const id = req.params.id;
        try {
            const product = await Product.findOne({ _id: id });
            res.json({ message: "Product fetch success", data: product });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
          const id = req.params.id;
          const {name, price, color,size,categories,gender,productImage,description}= req.body;
    
          await Product.findOneAndUpdate(
            { _id: id },
            { name, price, color, size, categories, gender, productImage,description}
          );
          res.json({
            message: "Product update success",
            data: { name, price, color, size, categories, gender, productImage,description},
          });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      },
      deleteProduct: async (req, res) => {
        try {
          const id = req.params.id;
    
          await Product.findByIdAndDelete({ _id: id });
          res.json({ message: "delete success !" });
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      },


};
module.exports= productController;