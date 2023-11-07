//cart controller 
const handleErrorResponse = require('../middleware/errorHandling');
const cartService = require('../service/cartService');
const { validationResult } = require('express-validator');

class CartController {
    static async addProductToCartService(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors.array() });
            }

            const { userId, productId, quantity } = req.body;

            const response = await cartService.addProductToCartService({ userId, productId, quantity });

            return res.status(response.status).json(response);
        } catch (error) {
            console.log(error);
            handleErrorResponse(res, error);
        }
    }

    static async updateProductInCartService(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, message: errors.array() });
            }

            const { userId, productId, quantity } = req.body;

            const response = await cartService.updateProductInCartService({ userId, productId, quantity });

            return res.status(response.status).json(response);
        } catch (error) {
            console.log(error);
            handleErrorResponse(res, error);
        }
    }
}

module.exports = CartController;