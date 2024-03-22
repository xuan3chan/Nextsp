const Products = require("../models/productModel");
const cloudinary = require("cloudinary").v2;
const removeAccents = require('remove-accents');

class ProductService {
  static async addProductService(
    req,
    { nameProduct, description, price, oldprice, brand, status, category }
  ) {
    try {
      // Validation
      if (!nameProduct || !price || !brand || !category) {
        throw {
          status: 400,
          message: "Missing required fields for product creation",
        };
      }
      // Check for duplicate product name
      const duplicateProduct = await Products.findOne({ nameProduct });
      if (duplicateProduct) {
        throw {
          status: 400,
          message: "A product with this name already exists",
        };
      }
      //price must be a number >0 and oldprice must be a number >0
      if (isNaN(price) || price <= 0) {
        throw {
          status: 400,
          message: "Price must be a number greater than 0",
        };}

      // Check for duplicate originalnames in req.files
      //1
      if (req.files) {
        const originalnames = req.files.map((file) => file.originalname);
        const uniqueOriginalnames = new Set(originalnames);
        if (uniqueOriginalnames.size < originalnames.length) {
          throw {
            status: 400,
            message: "Duplicate file names are not allowed",
          };
        }
      }

      // Create a new product instance
      const newProduct = new Products({
        nameProduct,
        description,
        price,
        oldprice,
        brand,
        category,
        status,
      });
      //2
      if (req.files && req.files.length > 0) {
        const imagePaths = req.files.map((el) => el.path);
        newProduct.images.push(...imagePaths);
      }
      console.log(req.files);
      // Save the new product
      const savedProduct = await newProduct.save();

      return {
        success: true,
        message: "Product created successfully",
        product: savedProduct,
      };
    } catch (error) {
      // If an error occurs, delete the files from Cloudinary
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const publicId = file.filename; // replace with the correct public ID
          cloudinary.uploader.destroy(publicId, function (error, result) {
            console.log(result, error);
          });
        }
      }

      // Re-throw the error
      throw error;
    }
  }

  // Update a product
  static async updateProductService(
    req,
    { id, nameProduct, description, price, oldprice, brand, status, category }
  ) {
    try {
      // Find the product
      const product = await Products.findById(id);
      if (!product) {
        throw { status: 404, message: "Product not found" };
      }
      const duplicateProduct = await Products.findOne({ nameProduct });
      if (duplicateProduct) {
        throw {
          status: 400,
          message: "A product with this name already exists",
        };
      }

      // Update the product fields
      if (nameProduct) product.nameProduct = nameProduct;
      if (description) product.description = description;
      if (price) product.price = price;
      if (category) product.category = category;
      if (oldprice) product.oldprice = oldprice;
      if (brand) product.brand = brand;
      if (status) product.status = status;

      // Check for duplicate originalnames in req.files
      if (req.files) {
        const originalnames = req.files.map((file) => file.originalname);
        const uniqueOriginalnames = new Set(originalnames);
        if (uniqueOriginalnames.size < originalnames.length) {
          throw {
            status: 400,
            message: "Duplicate file names are not allowed",
          };
        }

        // Update the product images
        const imagePaths = req.files.map((el) => el.path);
        product.images.unshift(...imagePaths); // Add new images to the beginning of the array

        // If there are more than 10 images, remove the oldest ones
        if (product.images.length > 10) {
          const imagesToDelete = product.images.splice(10); // Get the images to delete
          const deletePromises = imagesToDelete.map((imagePath) => {
            const splitUrl = imagePath.split("/");
            const filename = splitUrl[splitUrl.length - 1].split(".")[0]; // Get the filename from the URL
            const publicId = `NEXTsp/${filename}`; // Construct the publicId
            return cloudinary.uploader.destroy(publicId);
          });

          try {
            await Promise.all(deletePromises);
            console.log("All images deleted successfully");
          } catch (error) {
            console.log("Error in deleting images: ", error);
          }
        }
      }

      // Save the updated product
      const updatedProduct = await product.save();

      return {
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      };
    } catch (error) {
      // If an error occurs, delete the files from Cloudinary
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const publicId = file.filename; // replace with the correct public ID
          cloudinary.uploader.destroy(publicId, function (error, result) {
            console.log(result, error);
          });
        }
      }
    }
  }
  //get all products
  static async getAllProductsService() {
    const products = await Products.find()
      .populate({
        path: "brand",
        select: "nameBrand _id",
      })
      .populate({
        path: "category",
        select: "nameCategory _id",
      });

    if (!products.length) {
      return { success: false, message: "No products found" };
    }

    const extractedProducts = products.map((product) => ({
      id: product.id,
      nameProduct: product.nameProduct,
      description: product.description,
      price: product.price,
      oldprice: product.oldprice,
      images: product.images,
      numReviews: product.numReviews,
      averageRating: product.averageRating,
      brand: product.brand
        ? {
            name: product.brand.nameBrand,
            id: product.brand._id,
          }
        : null,
      category: product.category
        ? {
            name: product.category.nameCategory,
            id: product.category._id,
          }
        : null,
      status: product.status,
    }));

    return {
      success: true,
      message: "Product details",
      products: extractedProducts,
    };
  }
  //delete product
  static async deleteProductService(id) {
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }
    // Delete all images of the product from Cloudinary
    for (const imageUrl of product.images) {
      const splitUrl = imageUrl.split("/");
      const filename = splitUrl[splitUrl.length - 1].split(".")[0]; // Get the filename from the URL
      const publicId = `NEXTsp/${filename}`; // Construct the publicId
      cloudinary.uploader.destroy(publicId, function (error, result) {
        if (error) console.log("Error in deleting image: ", error);
        else console.log("Deleting image result: ", result);
      });
    }

    return { success: true, message: "Product deleted successfully", product };
  }
  //getdetails product by id
  static async getDetailsProductService(id) {
    const product = await Products.findById(id);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }
    return { success: true, message: "Product details", product };
  }
  // serach product by name
 

  static async searchProductService(nameProduct) {
    const normalizedInput = removeAccents(nameProduct);
    const regex = new RegExp([...normalizedInput].join('.*'), 'i');

    const products = await Products.find();
    const matchedProducts = products.filter(product => 
      regex.test(removeAccents(product.nameProduct))
    );

    if (!matchedProducts.length) {
      throw { status: 404, message: "Product not found" };
    }

    return { success: true, message: "Product details", product: matchedProducts };
  }
  
}

module.exports = ProductService;
