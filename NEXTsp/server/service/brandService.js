const Brand = require('../models/brandModel');

class BrandService {
    static async addBrandService({ nameBrand, description, categoryid, status }) {
        if (!nameBrand || !categoryid || !status) {
            throw { status: 400, message: 'Missing required parameters' };
        }

        const newBrand = new Brand({ nameBrand, description, categoryid, status });
        await newBrand.save();

        return { success: true, message: 'Brand created successfully' };
    }

    static async updateBrandService({ id, nameBrand, description, categoryid }) {
        if (!nameBrand || !categoryid) {
            throw { status: 400, message: 'Missing required parameters' };
        }

        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            { nameBrand, description, categoryid },
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
        const extractedBrands = brands.map((brand) => ({
            id: brand._id,
            nameBrand: brand.nameBrand,
            description: brand.description,
            categoryid: brand.categoryid,
            status: brand.status,
        }));

        return { success: true, brands: extractedBrands };
    }
 
}

module.exports = BrandService;
