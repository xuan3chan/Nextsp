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
        const duplicate = await Brand.findOne({ nameBrand });
        if (duplicate) {
            return { success: false, status: 400, message: 'Brand already exists' };
        }

        // Create an update object with description and category
        const update = { description, category,status, };

        // If nameBrand is defined, slugify it and add nameBrand and brandSlug to the update object
        if (nameBrand) {
            const brandSlug = slugify(nameBrand, { lower: true });
            update.nameBrand = nameBrand;
            update.brandSlug = brandSlug;
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

    static async getAllBrandsService() {
        const brands = await Brand.find().populate('category','nameCategory _id');
        const extractedBrands = brands.map((brand) => ({
            id: brand.id,
            nameBrand: brand.nameBrand,
            description: brand.description,
            category: brand.category ? {name: brand.category.nameCategory,id: brand.category._id} : null,
            status: brand.status,
        }));

        return { success: true, brands: extractedBrands };
    }
}

module.exports = BrandService;
