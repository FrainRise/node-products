const express = require('express');
const {getAllUsers, createUser, getUser, updateUser, deleteUser} = require('../controllers/users')
const {verifyBodyReq} = require('../utils/verifyUserRoute')
const API_ROUTES = {
    USERS: '/',
    USERS_BY_ID: '/:id'
};


const router = express.Router();

router.route(API_ROUTES.USERS)
    .get(getAllUsers)
    .post(verifyBodyReq, createUser);
router.route(API_ROUTES.USERS_BY_ID)
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;
