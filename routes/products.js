const express = require('express');
const {getAllProducts, createProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/products')
const {verifyBodyReq} = require('../utils/verifyProductsRoute')
const API_ROUTES = {
    PRODUCTS: '/',
    PRODUCTS_BY_ID: '/:id'
};

const router = express.Router();

router.route(API_ROUTES.PRODUCTS)
    .get(getAllProducts)
    .post(verifyBodyReq, createProduct);
router.route(API_ROUTES.PRODUCTS_BY_ID)
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

module.exports = router;
