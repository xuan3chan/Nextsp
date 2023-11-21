// controllers/brandCtrl.js
const BrandService = require("../service/brandService");
const handleErrorResponse = require("../middleware/errorHandling");

class BrandController {
  static async addBrandController(req, res) {
    try {
      const result = await BrandService.addBrandService(req.body);
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async updateBrandController(req, res) {
    try {
      const { id } = req.params;
      const result = await BrandService.updateBrandService({ id, ...req.body });
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async deleteBrandController(req, res) {
    try {
      const result = await BrandService.deleteBrandService(req.params.id);
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async getAllBrandsController(req, res) {
    try {
      const result = await BrandService.getAllBrandsService();
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}

module.exports = BrandController;
