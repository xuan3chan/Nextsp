    //cart service 
    const Cart = require('../models/cartModel');
    const Product = require('../models/productModel');
    const User = require('../models/User');

    class CartService {
        static async addProductToCartService({ userId, productId, quantity }) {
            if (!userId || !productId || !quantity) {
                return { success: false, status: 400, message: 'Missing required parameters' };
            }

            const product = await Product.findById(productId);

            if (!product) {
                return { success: false, status: 404, message: 'Product not found' };
            }

            const user = await User.findById(userId);

            if (!user) {
                return { success: false, status: 404, message: 'User not found' };
            }

            const cart = await Cart.findOne({ userId });

            if (!cart) {
                const newCart = new Cart({
                    userId,
                    products: [{ product: productId, quantity, priceOfCase: product.price*quantity }],
                });

                await newCart.save();
            } else {
                const productInCart = cart.products.find((item) => item.product.toString() === productId);

                if (productInCart) {
                    productInCart.quantity += quantity;
                    productInCart.priceOfCase += product.price * quantity;
                } else {
                    cart.products.push({ product: productId, quantity, priceOfCase: product.price*quantity });
                }

                await cart.save();
            }

            return { success: true, message: 'Product added to cart successfully' };
        }

        static async updateProductInCartService({ userId, productId, quantity }) {
            if (!userId || !productId || !quantity) {
                return { success: false, status: 400, message: 'Missing required parameters' };
            }

            const product = await Product.findById(productId);

            if (!product) {
                return { success: false, status: 404, message: 'Product not found' };
            }

            const user = await User.findById(userId);

            if (!user) {
                return { success: false, status: 404, message: 'User not found' };
            }

            const cart = await Cart.findOne({ userId });

            if (!cart) {
                return { success: false, status: 404, message: 'Cart not found' };
            }

            const productInCart = cart.products.find((item) => item.product.toString() === productId);

            if (!productInCart) {
                return { success: false, status: 404, message: 'Product not found in cart' };
            }
            productInCart.quantity = quantity;
            productInCart.priceOfCase = product.price * quantity;
            
            await cart.save();

            return { success: true, message: 'Product updated in cart successfully' };
        }
    }

    module.exports = CartService;