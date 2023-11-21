// controllers/productCtrl.js
const ProductService = require("../service/productService");
const handleErrorResponse = require("../middleware/errorHandling");

class ProductController {
  static async addProductController(req, res) {
    try {
      const result = await ProductService.addProductService(req, req.body);
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async updateProductController(req, res) {
    try {
      const { id } = req.params;
      const result = await ProductService.updateProductService(req, {
        id,
        ...req.body,
      });
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async deleteProductController(req, res) {
    try {
      const result = await ProductService.deleteProductService(req.params.id);
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async getDetailsProductController(req, res) {
    try {
      const result = await ProductService.getDetailsProductService(
        req.params.id
      );
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async getAllProductsController(req, res) {
    try {
      const result = await ProductService.getAllProductsService();
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
  static async searchProductController(req, res) {
    try {
      const nameProduct = req.params.nameProduct;
      const result = await ProductService.searchProductService(nameProduct);
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}

module.exports = ProductController;
