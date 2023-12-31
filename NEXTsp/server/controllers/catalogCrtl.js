const catalogService = require("../services/catalogService");
const handleErrorResponse = require("../middleware/errorHandling");

class CatalogController {
  static async getAllCategoriesAndBrandsController(req, res, next) {
    try {
      const { success, categories } =
        await catalogService.getAllCategoriesAndBrandsService();
      if (success) {
        res.status(200).json({ success, categories });
      } else {
        res.status(500).json({ success, error: "Internal Server Error" });
      }
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}

module.exports = CatalogController;
