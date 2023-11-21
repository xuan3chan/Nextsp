const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');
const slugify = require('slugify'); // Import thư viện slugify

class BrandService {
    static async addBrandService({ nameBrand, description, category, status }) {
        if (!nameBrand || !category || !status) {
            return { success: false, status: 400, message: 'Missing required parameters' };
        }
        const duplicate = await Brand.findOne({ nameBrand });
        if (duplicate) {
            return { success: false, status: 400, message: 'Brand already exists' };
        }

        // Tạo slug từ tên brand
        const brandSlug = slugify(nameBrand, { lower: true });

        const newBrand = new Brand({ nameBrand, description, category, status, brandSlug });
        const savedBrand = await newBrand.save();

        // Lưu id của brand vào trường brands của category
        await Category.findByIdAndUpdate(category, { $push: { brands: savedBrand._id } });

        return { success: true, message: 'Brand created successfully' };
    }

    static async updateBrandService({ id, nameBrand, description, category ,status}) {
        const currentBrand = await Brand.findById(id);
        if (!currentBrand) {
            return { success: false, status: 404, message: 'Brand not found' };
        }

        const duplicate = await Brand.findOne({ nameBrand, _id: { $ne: id } });
        if (duplicate) {
            return { success: false, status: 400, message: 'Brand already exists' };
        }

        // Create an update object with description and category
        const update = { description, category, status };

        // If nameBrand is defined, slugify it and add nameBrand and brandSlug to the update object
        if (nameBrand) {
            const brandSlug = slugify(nameBrand, { lower: true });
            update.nameBrand = nameBrand;
            update.brandSlug = brandSlug;
        }

        // Remove brand ID from all categories
        await Category.updateMany({}, { $pull: { brands: id } });

        // Add brand ID to new category
        for (let newCategoryId of category) {
            await Category.findByIdAndUpdate(newCategoryId, { $push: { brands: id } });
        }

        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            update,
            { new: true, runValidators: true }
        );

        if (!updatedBrand) {
            return { success: false, status: 404, message: 'Brand not found or user not authorized' };
        }

        return { success: true, message: 'Excellent progress!', brand: updatedBrand };
    }
    static async deleteBrandService(id) {
        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            return { success: false, status: 404, message: 'Brand not found or user not authorized' };
        }

        // Xóa id của brand khỏi trường brands của category
        await Category.updateMany({}, { $pull: { brands: id } });

        return { success: true, message: 'Excellent progress!' };
    }
    // get all brand
    static async getAllBrandsService() {
        const brands = await Brand.find().populate('category', 'nameCategory _id');
        return { success: true, message: 'Excellent progress!', brands };
    }
}

module.exports = BrandService;
