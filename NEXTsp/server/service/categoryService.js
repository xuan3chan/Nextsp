// services/categoryService.js
const Category = require('../models/categoryModel');

class CategoryService {
    static async addCategoryService({ nameCategory, description,status }) {
        if (!nameCategory) {
            throw { status: 400, message: 'Missing nameCategory and/or description' };
        }

        const newCategory = new Category({ nameCategory, description,status});
        await newCategory.save();

        return { success: true, message: 'Category created successfully' };
    }

    static async updateCategoryService({ id, nameCategory, description, status }) {
        if (!nameCategory) {
            throw { status: 400, message: 'Missing nameCategory and/or description' };
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { nameCategory, description, status},
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            throw { status: 404, message: 'Category not found or user not authorized' };
        }

        return { success: true, message: 'Excellent progress!', category: updatedCategory };
    }

    static async deleteCategoryService(id) {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            throw { status: 404, message: 'Category not found or user not authorized' };
        }

        return { success: true, message: 'Excellent progress!' };
    }

    static async getAllCategoriesService() {
        const categories = await Category.find();
        return { success: true, categories };
    }
    
}

module.exports = CategoryService;
