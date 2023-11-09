const Products = require('../models/productModel');
const cloudinary = require('cloudinary').v2;

class ProductService {
  static async addProductService(req, { nameProduct, description, price, oldprice, brand, status }) {
    try {
      // Validation
      if (!nameProduct || !price || !brand) {
        throw { status: 400, message: 'Missing required fields for product creation' };
      }

      // Check for duplicate product name
      const duplicateProduct = await Products.findOne({ nameProduct });
      if (duplicateProduct) {
        throw { status: 400, message: 'A product with this name already exists' };
      }

      // Check for duplicate originalnames in req.files
      if (req.files) {
        const originalnames = req.files.map(file => file.originalname);
        const uniqueOriginalnames = new Set(originalnames);
        if (uniqueOriginalnames.size < originalnames.length) {
          throw { status: 400, message: 'Duplicate file names are not allowed' };
        }
      }

      // Create a new product instance
      const newProduct = new Products({
        nameProduct,
        description,
        price,
        oldprice,
        brand,
        status,
      });

      if (req.files && req.files.length > 0) {
        const imagePaths = req.files.map(el => el.path);
        newProduct.images.push(...imagePaths);
      }

      // Save the new product
      const savedProduct = await newProduct.save();

      return { success: true, message: 'Product created successfully', product: savedProduct };
    } catch (error) {
      // If an error occurs, delete the files from Cloudinary
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const publicId = file.filename;
          cloudinary.uploader.destroy(publicId, function (error, result) {
            console.log(result, error);
          });
        }
      }

      // Re-throw the error
      throw error;
    }
  }

  static async updateProductService(req, { id, nameProduct, description, price, oldprice, brand, status }) {
    try {
      // Find the product
      const product = await Products.findById(id);
      if (!product) {
        throw { status: 404, message: 'Product not found' };
      }

      const duplicateProduct = await Products.findOne({ nameProduct });
      if (duplicateProduct && duplicateProduct._id.toString() !== id) {
        throw { status: 400, message: 'A product with this name already exists' };
      }

      // Update the product fields
      if (nameProduct) product.nameProduct = nameProduct;
      if (description) product.description = description;
      if (price) product.price = price;
      if (oldprice) product.oldprice = oldprice;
      if (brand) product.brand = brand;
      if (status) product.status = status;

      // Check for duplicate originalnames in req.files
      if (req.files) {
        // Delete the existing images from Cloudinary
        for (const imagePath of product.images) {
          const publicId = imagePath;
          cloudinary.uploader.destroy(publicId, function (error, result) {
            console.log(result, error);
          });
        }

        // Clear the product images
        product.images = [];

        const originalnames = req.files.map(file => file.originalname);
        const uniqueOriginalnames = new Set(originalnames);
        if (uniqueOriginalnames.size < originalnames.length) {
          throw { status: 400, message: 'Duplicate file names are not allowed' };
        }

        // Update the product images
        const imagePaths = req.files.map(el => el.path);
        product.images.push(...imagePaths);
      }

      // Save the updated product
      const updatedProduct = await product.save();

      return { success: true, message: 'Product updated successfully', product: updatedProduct };
    } catch (error) {
      // If an error occurs, delete the files from Cloudinary
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const publicId = file.filename;
          cloudinary.uploader.destroy(publicId, function (error, result) {
            console.log(result, error);
          });
        }
      }

      // Re-throw the error
      throw error;
    }
  }

  static async getAllProductsService() {
    const products = await Products.find().populate({
      path: 'brand',
      select: 'nameBrand _id category',
      populate: {
        path: 'category',
        select: 'nameCategory _id'
      }
    });

    if (!products.length) {
      return { success: false, message: 'No products found' };
    }

    const extractedProducts = products.map(product => ({
      id: product.id,
      nameProduct: product.nameProduct,
      description: product.description,
      price: product.price,
      oldprice: product.oldprice,
      images: product.images,
      brand: product.brand ? { 
        name: product.brand.nameBrand, 
        id: product.brand._id,
        category: product.brand.category ? product.brand.category : null
      } : null,
      status: product.status,
    }));

    return { success: true, message: 'Product details', products: extractedProducts };
  }

  static async deleteProductService(id) {
    const product = await Products.findById(id);
    if (!product) {
      throw { status: 404, message: 'Product not found' };
    }

    // Delete the product images from Cloudinary
    for (const imagePath of product.images) {
      const publicId = imagePath;
      cloudinary.uploader.destroy(publicId, function (error, result) {
        console.log(result, error);
      });
    }

    // Delete the product
    await product.remove();

    return { success: true, message: 'Product deleted successfully' };
  }

  static async getDetailsProductService(id) {
    const product = await Products.findById(id);
    if (!product) {
      throw { status: 404, message: 'Product not found' };
    }
    return { success: true, message: 'Product details', product };
  }
}

module.exports = ProductService;
