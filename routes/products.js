const express = require('express');
const {getAllProducts, createProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/products')
const {verifyBodyReq} = require('../utils/verifyProductsRoute')
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.route('/')
    .get(getAllProducts)
    .post(verifyBodyReq, createProduct);
router.route('/:id')
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

module.exports = router;
