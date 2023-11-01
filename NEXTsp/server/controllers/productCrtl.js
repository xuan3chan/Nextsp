// controllers/productCtrl.js
const ProductService = require('../service/productService');
const handleErrorResponse = require('../middleware/errorHandling');

class ProductController {
    static async addProduct(req, res) {
        try {
            const result = await ProductService.addProductService(req,req.body);
            res.json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductService.updateProductService(req,{ id, ...req.body });
            res.json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    static async deleteProduct(req, res) {
        try {
            const result = await ProductService.deleteProductService(req.params.id);
            res.json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    static async getDetailsProduct(req, res) {
        try {
            const result = await ProductService.getDetailsProductService(req.params.id);
            res.json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    // static async deleteManyProducts(req, res) {
    //     try {
    //         const result = await ProductService.deleteManyProductsService(req.body.ids);
    //         res.json(result);
    //     } catch (error) {
    //         handleErrorResponse(res, error);
    //     }
    // }

    static async getAllProducts(req, res) {
        try {
            const result = await ProductService.getAllProductsService();
            res.json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
}

module.exports = ProductController;
