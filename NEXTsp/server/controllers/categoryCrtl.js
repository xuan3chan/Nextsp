const Category = require('../models/categoryModel');

class CategoryController {
    static async addCategory(req, res) {
        try {
            const { nameCategory, description } = req.body;

            if (!nameCategory)
                return res
                    .status(400)
                    .json({ success: false, message: 'Missing nameCategory and/or description' });

            const newCategory = new Category({ nameCategory, description });
            await newCategory.save();
            res.json({
                success: true,
                message: 'Category created successfully',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async updateCategory(req, res) {
        try {
            const { nameCategory, description } = req.body;

            if (!nameCategory)
                return res
                    .status(400)
                    .json({ success: false, message: 'Missing nameCategory and/or description' });

            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                { nameCategory, description },
                { new: true, runValidators: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found or user not authorized',
                });
            }

            res.json({
                success: true,
                message: 'Excellent progress!',
                category: updatedCategory,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    //create method to delete category
    static async deleteCategory(req, res) {
        try {
            const deletedCategory = await Category.findByIdAndDelete(req.params.id);

            if (!deletedCategory) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found or user not authorized',
                });
            }

            res.json({ success: true, message: 'Excellent progress!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    //create method to get all categories
    static async getallCategories(req, res) {
        try {
            const categories = await Category.find();
            res.json({ success: true, categories });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    
    
}

module.exports = CategoryController;
