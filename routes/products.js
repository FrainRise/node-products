const express = require('express');
const API_ROUTES = {
    PRODUCTS: '/',
    PRODUCTS_BY_ID: '/:id'
};

const router = express.Router();

router.route(API_ROUTES.PRODUCTS)
    .get()
    .post();
router.route(API_ROUTES.PRODUCTS_BY_ID)
    .get()
    .patch()
    .delete();

module.exports = router;
