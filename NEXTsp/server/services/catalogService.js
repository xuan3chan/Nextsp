//tôi muốn viết 1 cái service có thể lấy hết tất cả category và từng brand đi theo category đó

// // services/catalogService.js
const Category = require('../models/categoryModel');
class CatalogService {
  
    static async getAllCategoriesAndBrandsService() {
        const categories = await Category.find().populate('brands');
        return { success: true, categories };
    }
}
module.exports = CatalogService;