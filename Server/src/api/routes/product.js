const { Router } =require( "express");
const productRoute = Router();
const productController =require("../controllers/product/product" );
productRoute.post(
    "/api/product/create",
    productController.createProduct
  );
  productRoute.get(
    "/api/product/getAll",
    productController.getProducts
  );
  productRoute.get(
    "/api/product/get/:id",
    productController.getOneProduct
  );
  productRoute.put(
    "/api/product/update/:id",
    productController.updateProduct
  );
  productRoute.delete(
    "/api/product/delete/:id",
    productController.deleteProduct
  );
  
  module.exports = productRoute;
//export default productRoute