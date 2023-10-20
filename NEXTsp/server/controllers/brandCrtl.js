const Brand = require('../models/brandModel');

class BrandController {
    static async addBrand(req, res) {
        try {
            const { nameBrand, description } = req.body;

            if (!nameBrand)
                return res
                    .status(400)
                    .json({ success: false, message: 'Missing nameBrand' });

            const newBrand = new Brand({ nameBrand, description });
            await newBrand.save();
            res.json({
                success: true,
                message: 'Brand created successfully',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async updateBrand(req, res) {
        try {
            const { nameBrand, description } = req.body;

            if (!nameBrand)
                return res
                    .status(400)
                    .json({ success: false, message: 'Missing nameBrand and/or description' });

            const updatedBrand = await Brand.findByIdAndUpdate(
                req.params.id,
                { nameBrand, description },
                { new: true, runValidators: true }
            );

            if (!updatedBrand) {
                return res.status(404).json({
                    success: false,
                    message: 'Brand not found or user not authorized',
                });
            }

            res.json({
                success: true,
                message: 'Excellent progress!',
                brand: updatedBrand,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    //create method to delete brand
    static async deleteBrand(req, res) {
        try {
            const deletedBrand = await Brand.findByIdAndDelete(req.params.id);

            if (!deletedBrand) {
                return res.status(404).json({
                    success: false,
                    message: 'Brand not found or user not authorized',
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
    //create method to get all brands
    static async getallBrands(req, res) {
        try {
            const brands = await Brand.find();
            const extractedBrands = brands.map(brand => {
                return {
                    nameBrand: brand.nameBrand,
                    description: brand.description,
                };
            });
            res.json({ success: true, brands: extractedBrands });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    
}

module.exports = BrandController;
