// controllers/categoryCtrl.js
const CategoryService = require('../service/categoryService');
const handleErrorResponse = require('../middleware/errorHandling');

class CategoryController {
    static async addCategory(req, res) {
        try {
            const result = await CategoryService.addCategoryService(req.body);
            res.json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const result = await CategoryService.updateCategoryService({ id, ...req.body });
            res.json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    static async deleteCategory(req, res) {
        try {
            const result = await CategoryService.deleteCategoryService(req.params.id);
            res.json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }

    static async getAllCategories(req, res) {
        try {
            const result = await CategoryService.getAllCategoriesService();
            res.json(result);
        } catch (error) {
            handleErrorResponse(res, error);
        }
    }
}

module.exports = CategoryController;
