const Products = require('../models/productModel');

class ProductService {
    static deleteImages(images, mode) {
        var basePath =
          path.resolve(__dirname + "../../") + "/public/uploads/products/";
        console.log(basePath);
        for (var i = 0; i < images.length; i++) {
          let filePath = "";
          if (mode == "file") {
            filePath = basePath + `${images[i].filename}`;
          } else {
            filePath = basePath + `${images[i]}`;
          }
          console.log(filePath);
          if (fs.existsSync(filePath)) {
            console.log("Exists image");
          }
          fs.unlink(filePath, (err) => {
            if (err) {
              return err;
            }
          });
        }
      }

      async addProduct(req, res) {
        try {
          const { nameProduct, description, price, brand, status } = req.body;
          const images = req.files;
      
          // Validation
          if (!nameProduct || !price || !brand || !status) {
            ProductService.deleteImages(images, "file");
            return res.json({ error: "All fields must be required" });
          }
      
          // Validate Name and description
          else if (nameProduct.length > 255 || description.length > 3000) {
            ProductService.deleteImages(images, "file");
            return res.json({
              error: "Name must be 255 characters & Description must not be 3000 characters long",
            });
          }
      
          // Validate Images
          else if (!images || images.length !== 2) {
            ProductService.deleteImages(images, "file");
            return res.json({ error: "Must provide exactly 2 images" });
          }
      
          // Process images
          let allImages = images.map(img => img.filename);
      
          // Create new product instance
          const newProduct = new Product({
            nameProduct,
            description,
            price,
            brand,
            images: allImages,
            status,
          });
      
          // Save the new product
          const save = await newProduct.save();
      
          if (save) {
            return res.json({ success: "Product created successfully" });
          }
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
      

    
    static async getAllProductsService() {
        const products = await Products.find();
        return { success: true, products };
    }
}

module.exports = ProductService;
