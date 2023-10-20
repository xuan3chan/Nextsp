//them sua xoa san pham
const Products = require('../models/productModel')
const Category = require('../models/categoryModel')
const Brand = require('../models/brandModel')

class ProductController {
    static async addProduct(req, res) {
        try {
            const { nameProduct, description, price, category, brand, images } = req.body;

            if (!nameProduct)
                return res
                    .status(400)
                    .json({ success: false, message: 'Missing nameProduct' });

            const newProduct = new Products({ nameProduct, description, price, category, brand, images });
            await newProduct.save();
            res.json({
                success: true,
                message: 'Product created successfully',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async updateProduct(req, res) {
        try {
            const { nameProduct, description, price, category, brand, images } = req.body;

            if (!nameProduct)
                return res
                    .status(400)
                    .json({ success: false, message: 'Missing nameProduct and/or description' });

            const updatedProduct = await Products.findByIdAndUpdate(
                req.params.id,
                { nameProduct, description, price, category, brand, images },
                { new: true, runValidators: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found or user not authorized',
                });
            }

            res.json({
                success: true,
                message: 'Excellent progress!',
                product: updatedProduct,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    //create method to delete product
    static async deleteProduct(req, res) {
        try {
            const deletedProduct = await Products.findByIdAndDelete(req.params.id);

            if (!deletedProduct) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found or user not authorized',
                });
            }

            res.json({ success: true, product: deletedProduct });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    //get all product
    static async getAllProduct(req, res) {
        try {
            const products = await Products.find();
            res.json({ success: true, products });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    
}