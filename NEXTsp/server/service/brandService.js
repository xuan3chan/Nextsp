// services/brandService.js
const Brand = require('../models/brandModel');

class BrandService {
    static async addBrandService({ nameBrand, description }) {
        if (!nameBrand) {
            throw { status: 400, message: 'Missing nameBrand' };
        }

        const newBrand = new Brand({ nameBrand, description });
        await newBrand.save();

        return { success: true, message: 'Brand created successfully' };
    }

    static async updateBrandService({ id, nameBrand, description }) {
        if (!nameBrand) {
            throw { status: 400, message: 'Missing nameBrand and/or description' };
        }

        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            { nameBrand, description },
            { new: true, runValidators: true }
        );

        if (!updatedBrand) {
            throw { status: 404, message: 'Brand not found or user not authorized' };
        }

        return { success: true, message: 'Excellent progress!', brand: updatedBrand };
    }

    static async deleteBrandService(id) {
        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            throw { status: 404, message: 'Brand not found or user not authorized' };
        }

        return { success: true, message: 'Excellent progress!' };
    }

    static async getAllBrandsService() {
        const brands = await Brand.find();
        const extractedBrands = brands.map((brand) => {
            return {
                nameBrand: brand.nameBrand,
                description: brand.description,
            };
        });

        return { success: true, brands: extractedBrands };
    }
}

module.exports = BrandService;
