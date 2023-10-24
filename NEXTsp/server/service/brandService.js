const Brand = require('../models/brandModel');

class BrandService {
    static async addBrandService({ nameBrand, description, category, status }) {
        if (!nameBrand) {
            throw new Error(400, 'Missing nameBrand');
        }

        const newBrand = new Brand({ nameBrand, description, category, status });
        await newBrand.save();

        return { success: true, message: 'Brand created successfully' };
    }

    static async updateBrandService({ id, nameBrand, description }) {
        if (!nameBrand) {
            throw new Error(400, 'Missing nameBrand and/or description');
        }

        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            { nameBrand, description },
            { new: true, runValidators: true }
        );

        if (!updatedBrand) {
            throw new Error(404, 'Brand not found or user not authorized');
        }

        return { success: true, message: 'Excellent progress!', brand: updatedBrand };
    }

    static async deleteBrandService(id) {
        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            throw new Error(404, 'Brand not found or user not authorized');
        }

        return { success: true, message: 'Excellent progress!' };
    }

    static async getAllBrandsService() {
        const brands = await Brand.find();
        const extractedBrands = brands.map((brand) => ({
            nameBrand: brand.nameBrand,
            description: brand.description,
        }));

        return { success: true, brands: extractedBrands };
    }
}

module.exports = BrandService;
