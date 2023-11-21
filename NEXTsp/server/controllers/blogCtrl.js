const blogCtrl = require("../controllers/blogCtrl");
const handleErrorResponse = require("../middleware/errorHandling");

//class
class BlogController {
  static async addBlogController(req, res) {
    try {
      const result = await blogCtrl.addBlogService(req.body);
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async updateBlogController(req, res) {
    try {
      const { id } = req.params;
      const result = await blogCtrl.updateBlogService({ id, ...req.body });
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async deleteBlogController(req, res) {
    try {
      const result = await blogCtrl.deleteBlogService(req.params.id);
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  } //them sr vo thoi chu khong chac lam, tai thay no cung hop ly
  static async searchBlogController(req, res) {
    try {
      const title = req.params.title;
      const result = await blogCtrl.searchBlogService(title);
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }

  static async getAllBlogsController(req, res) {
    try {
      const result = await blogCtrl.getAllBlogsService();
      res.json(result);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  }
}
module.exports = BlogController;
