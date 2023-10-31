const Products = require('../models/productModel');

class ProductService {
    static async addProductService({ nameProduct, description, price, category, brand, request }) {
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

        // Nếu Multer đã xử lý và có ảnh, thêm vào sản phẩm
        if (request.file) {
            newProduct.images = [{ path: request.file.filename }];
        }

        const savedProduct = await newProduct.save();
        return { success: true, message: 'Product created successfully', product: savedProduct };
    }
    static async updateProductService({ id, nameProduct, description, price, oldprice, category, brand, request, status }) {
        if (!id || !nameProduct || !description || !price || !oldprice || !category || !brand || !request.file || !status) {
            throw { status: 400, message: 'Missing required fields for product update' };
        }

        const existingProduct = await Products.findById(id);

        if (!existingProduct) {
            throw { status: 404, message: 'Product not found or user not authorized' };
        }

        // Nếu Multer đã xử lý và có ảnh, cập nhật vào sản phẩm
        if (request.file) {
            existingProduct.images = [{ path: request.file.filename }];
        }

        // Cập nhật các trường khác
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
