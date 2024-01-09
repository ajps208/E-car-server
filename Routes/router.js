const express = require('express')
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const wishlistController = require('../Controllers/wishlistController')
const cartController = require('../Controllers/cartController')

const router = new express.Router()

//allproducts
router.get('/products/all',productController.getAllProductController)
//view product
router.get('/products/view/:id',productController.getAProductController)
//register
router.post('/user/register',userController.registerController)
//login
router.post('/user/login',userController.loginController)
//addtowishlist
router.post('/user/wishlist/add',jwtMiddleware,wishlistController.addToWishlistController)
//getwishlist
router.get('/user/wishlist',jwtMiddleware,wishlistController.getUserWishlistController)
//removewishlistitem
router.delete('/user/wishlist/remove/:id',jwtMiddleware,wishlistController.removeWishlistItemCOntroller)
//addtocart
router.post('/user/cart/add',jwtMiddleware,cartController.addtocartController)
//getcart
router.get('/user/cart',jwtMiddleware,cartController.getUserCartController)
//increment cart quantity
router.get('/user/cart/increment/:id',jwtMiddleware,cartController.incrementCartCountController)
//decrement cart quantity
router.get('/user/cart/decrement/:id',jwtMiddleware,cartController.decrementCartCountController)
//removecartItem
router.delete('/user/cart/remove/:id',jwtMiddleware,cartController.removeCartItemController)
//emptyCart
router.delete('/user/cart/empty',jwtMiddleware,cartController.emptyCartController)

module.exports = router                  