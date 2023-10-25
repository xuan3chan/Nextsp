const Products = require('../models/productModel');

class ProductService {
    static async addProductService({ nameProduct, description, price, category, brand, filename }) {
        if (!nameProduct || !description || !price || !category || !brand) {
            throw { status: 400, message: 'Missing required fields for product creation' };
        }

        const newProduct = new Products({
            nameProduct,
            description,
            price,
            category,
            brand,
        });

        // If filename is provided, update images with the filename
        if (filename) {
            newProduct.images = [{ path: filename }];
        }

        const savedProduct = await newProduct.save();
        return { success: true, message: 'Product created successfully', product: savedProduct };
    }

    static async updateProductService({ id, nameProduct, description, price, oldprice, category, brand, images, status }) {
        if (!id || !nameProduct || !description || !price || !oldprice || !category || !brand || !images || images.length === 0 || !status) {
            throw { status: 400, message: 'Missing required fields for product update' };
        }

        const existingProduct = await Products.findById(id);

        if (!existingProduct) {
            throw { status: 404, message: 'Product not found or user not authorized' };
        }

        // Handle image updates
        if (images && images.length > 0) {
            existingProduct.images = images;
        }

        // Update other fields
        existingProduct.nameProduct = nameProduct;
        existingProduct.description = description;
        existingProduct.price = price;
        existingProduct.oldprice = oldprice;
        existingProduct.category = category;
        existingProduct.brand = brand;
        existingProduct.status = status;

        const updatedProduct = await existingProduct.save();

        return { success: true, message: 'Product updated successfully', product: updatedProduct };
    }

    static async deleteProductService(id) {
        if (!id) {
            throw { status: 400, message: 'Missing product ID for deletion' };
        }

        const deletedProduct = await Products.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw { status: 404, message: 'Product not found or user not authorized' };
        }

        return { success: true, message: 'Product deleted successfully', product: deletedProduct };
    }

    static async getDetailsProductService(id) {
        if (!id) {
            throw { status: 400, message: 'Missing product ID for details' };
        }

        const productDetails = await Products.findById(id);

        if (!productDetails) {
            throw { status: 404, message: 'Product not found' };
        }

        return { success: true, product: productDetails };
    }

    static async getAllProductsService() {
        const products = await Products.find();
        return { success: true, products };
    }
}

module.exports = ProductService;
